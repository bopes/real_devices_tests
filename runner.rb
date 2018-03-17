require 'JSON'
require 'CSV'

# Set ENV variables
ENV['BROWSERSTACK_USER'] = 'charliewalmartpe1'
ENV['BROWSERSTACK_ACCESS_KEY'] = 'tcqpabQ594TyNxpApGey'

# Set execution variables
mocha_report_file = './mocha_report.json'
tags = {
	'ip10': { 'dpro' => 'ios',     'profile' => 'bs_ip10' },
	'ip8':  { 'dpro' => 'ios',     'profile' => 'bs_ip8'  },
	'ip7p': { 'dpro' => 'ios',     'profile' => 'bs_ip7p' },
	'ip7':  { 'dpro' => 'ios',     'profile' => 'bs_ip7'  },
	's8':   { 'dpro' => 'android', 'profile' => 'bs_s8'   },
	's7':   { 'dpro' => 'android', 'profile' => 'bs_s7'   },
	's5':   { 'dpro' => 'android', 'profile' => 'bs_s5'   },
}



# Execute tests
tags.each do |tag, config|

	# Clear last report
	File.delete(mocha_report_file) if File.exists?(mocha_report_file)

	# Execute system command
	cmd = "DPRO=#{config['dpro']} ./node_modules/.bin/magellan --tag #{tag} --profile #{config['profile']} --max_workers 25 --max_test_attempts 1 "
	system cmd

	# Read raw JSON report
	mocha_report_json = File.read(mocha_report_file)
	mocha_report = JSON.parse(mocha_report_json)
	stats = mocha_report['stats']
	tests = mocha_report['tests']
	passes = mocha_report['passes']
	failures = mocha_report['failures']

	# Convert JSON to CSV - Individual Test Durations
	CSV.open('./individual-tests.csv', 'a') do |csv|
		passes.each do |pass|
			csv << ["pass",tag,pass['duration'],pass]
		end
		failures.each do |failure|
			csv << ["failure",tag,failure['duration'],failure]
		end
	end

	# Convert JSON to CSV - Build Info (parallelization)
	CSV.open('./builds.csv', 'a') do |csv|
		csv << [tag,stats['tests'],stats['passes'],stats['pending'],stats['failures'],stats['start'],stats['end'],stats['duration'],mocha_report]
	end

end

