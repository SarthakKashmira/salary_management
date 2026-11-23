namespace :demo_data do
  DEPARTMENT_NAMES = [
    "Engineering", "Sales", "Marketing", "Human Resources", "Finance",
    "Operations", "Legal", "Customer Support", "Product", "Design"
  ].freeze

  TEAM_MEMBERS = [
    { email: "hrmanager@incubyte.com", first_name: "HR", last_name: "Manager", role: :admin },
    { email: "priya.sharma@incubyte.com", first_name: "Priya", last_name: "Sharma", role: :member },
    { email: "rahul.verma@incubyte.com", first_name: "Rahul", last_name: "Verma", role: :member },
    { email: "ananya.iyer@incubyte.com", first_name: "Ananya", last_name: "Iyer", role: :member },
    { email: "vikram.singh@incubyte.com", first_name: "Vikram", last_name: "Singh", role: :member }
  ].freeze

  # name, code, symbol - exchange rates for these are defined in config/initializers/money.rb.
  CURRENCY_DATA = [
    [ "US Dollar", "USD", "$" ],
    [ "Euro", "EUR", "€" ],
    [ "British Pound", "GBP", "£" ],
    [ "Indian Rupee", "INR", "₹" ],
    [ "Japanese Yen", "JPY", "¥" ],
    [ "Chinese Yuan", "CNY", "¥" ],
    [ "Australian Dollar", "AUD", "A$" ],
    [ "Canadian Dollar", "CAD", "C$" ],
    [ "Swiss Franc", "CHF", "CHF" ],
    [ "Singapore Dollar", "SGD", "S$" ],
    [ "UAE Dirham", "AED", "د.إ" ],
    [ "Saudi Riyal", "SAR", "﷼" ],
    [ "South African Rand", "ZAR", "R" ],
    [ "Brazilian Real", "BRL", "R$" ],
    [ "Mexican Peso", "MXN", "$" ],
    [ "South Korean Won", "KRW", "₩" ],
    [ "Indonesian Rupiah", "IDR", "Rp" ],
    [ "Thai Baht", "THB", "฿" ],
    [ "Malaysian Ringgit", "MYR", "RM" ],
    [ "Philippine Peso", "PHP", "₱" ],
    [ "Vietnamese Dong", "VND", "₫" ],
    [ "Egyptian Pound", "EGP", "£" ],
    [ "Nigerian Naira", "NGN", "₦" ],
    [ "Kenyan Shilling", "KES", "KSh" ],
    [ "Pakistani Rupee", "PKR", "₨" ],
    [ "Bangladeshi Taka", "BDT", "৳" ],
    [ "Sri Lankan Rupee", "LKR", "Rs" ],
    [ "Turkish Lira", "TRY", "₺" ],
    [ "Russian Ruble", "RUB", "₽" ],
    [ "Swedish Krona", "SEK", "kr" ],
    [ "Norwegian Krone", "NOK", "kr" ],
    [ "Danish Krone", "DKK", "kr" ],
    [ "Polish Zloty", "PLN", "zł" ],
    [ "New Zealand Dollar", "NZD", "NZ$" ]
  ].freeze

  # name, ISO 3166-1 alpha-2 code
  COUNTRY_DATA = [
    [ "India", "IN" ], [ "United States", "US" ], [ "United Kingdom", "GB" ], [ "Canada", "CA" ],
    [ "Australia", "AU" ], [ "Germany", "DE" ], [ "France", "FR" ], [ "Italy", "IT" ], [ "Spain", "ES" ],
    [ "Netherlands", "NL" ], [ "Belgium", "BE" ], [ "Switzerland", "CH" ], [ "Austria", "AT" ],
    [ "Sweden", "SE" ], [ "Norway", "NO" ], [ "Denmark", "DK" ], [ "Finland", "FI" ], [ "Poland", "PL" ],
    [ "Portugal", "PT" ], [ "Greece", "GR" ], [ "Ireland", "IE" ], [ "Russia", "RU" ], [ "China", "CN" ],
    [ "Japan", "JP" ], [ "South Korea", "KR" ], [ "Singapore", "SG" ], [ "Malaysia", "MY" ],
    [ "Thailand", "TH" ], [ "Indonesia", "ID" ], [ "Philippines", "PH" ], [ "Vietnam", "VN" ],
    [ "Taiwan", "TW" ], [ "Hong Kong", "HK" ], [ "Pakistan", "PK" ], [ "Bangladesh", "BD" ],
    [ "Sri Lanka", "LK" ], [ "Nepal", "NP" ], [ "United Arab Emirates", "AE" ], [ "Saudi Arabia", "SA" ],
    [ "Qatar", "QA" ], [ "Kuwait", "KW" ], [ "Bahrain", "BH" ], [ "Oman", "OM" ], [ "Israel", "IL" ],
    [ "Turkey", "TR" ], [ "Egypt", "EG" ], [ "South Africa", "ZA" ], [ "Nigeria", "NG" ], [ "Kenya", "KE" ],
    [ "Ghana", "GH" ], [ "Morocco", "MA" ], [ "Ethiopia", "ET" ], [ "Tanzania", "TZ" ], [ "Uganda", "UG" ],
    [ "Brazil", "BR" ], [ "Mexico", "MX" ], [ "Argentina", "AR" ], [ "Chile", "CL" ], [ "Colombia", "CO" ],
    [ "Peru", "PE" ], [ "Venezuela", "VE" ], [ "Ecuador", "EC" ], [ "Uruguay", "UY" ], [ "Paraguay", "PY" ],
    [ "Bolivia", "BO" ], [ "New Zealand", "NZ" ], [ "Fiji", "FJ" ], [ "Ukraine", "UA" ],
    [ "Czech Republic", "CZ" ], [ "Hungary", "HU" ], [ "Romania", "RO" ], [ "Bulgaria", "BG" ],
    [ "Croatia", "HR" ], [ "Serbia", "RS" ], [ "Slovakia", "SK" ], [ "Slovenia", "SI" ], [ "Lithuania", "LT" ],
    [ "Latvia", "LV" ], [ "Estonia", "EE" ], [ "Iceland", "IS" ], [ "Luxembourg", "LU" ], [ "Malta", "MT" ],
    [ "Cyprus", "CY" ], [ "Jordan", "JO" ], [ "Lebanon", "LB" ], [ "Iraq", "IQ" ], [ "Iran", "IR" ],
    [ "Kazakhstan", "KZ" ], [ "Uzbekistan", "UZ" ], [ "Azerbaijan", "AZ" ], [ "Georgia", "GE" ],
    [ "Armenia", "AM" ], [ "Myanmar", "MM" ], [ "Cambodia", "KH" ], [ "Laos", "LA" ], [ "Mongolia", "MN" ],
    [ "Algeria", "DZ" ], [ "Tunisia", "TN" ], [ "Libya", "LY" ], [ "Sudan", "SD" ]
  ].freeze

  FIRST_NAMES = %w[
    Aarav Vivaan Aditya Vihaan Arjun Sai Krishna Ishaan Rohan Karan
    Ananya Diya Isha Kavya Meera Pooja Riya Saanvi Tara Zoya
    James Robert John Michael William David Daniel Matthew Joseph Henry
    Emma Olivia Ava Sophia Isabella Mia Charlotte Amelia Harper Evelyn
  ].freeze

  LAST_NAMES = %w[
    Sharma Verma Iyer Singh Patel Gupta Nair Reddy Kumar Rao
    Smith Johnson Williams Brown Jones Garcia Miller Davis Rodriguez Martinez
    Mehta Shah Joshi Agarwal Chatterjee Banerjee Das Pillai Menon Rana
  ].freeze

  DESIGNATIONS = [
    "Software Engineer", "Senior Software Engineer", "QA Engineer", "Product Manager", "Engineering Manager",
    "Sales Executive", "Marketing Specialist", "HR Specialist", "Financial Analyst", "Operations Analyst",
    "UX Designer", "Business Analyst", "Support Engineer", "Account Manager", "Legal Counsel"
  ].freeze

  EMPLOYEE_COUNT = 10_000
  EMPLOYEE_BATCH_SIZE = 1000

  desc "Seed departments, team members, currencies, countries, and #{EMPLOYEE_COUNT} fake employees/salaries. " \
       "Run manually - never automatic on deploy."
  task seed: :environment do
    puts "Seeding departments..."
    DEPARTMENT_NAMES.each { |name| Department.find_or_create_by!(name: name) }

    puts "Seeding team members..."
    TEAM_MEMBERS.each do |attributes|
      User.find_or_create_by!(email: attributes[:email]) do |user|
        user.first_name = attributes[:first_name]
        user.last_name = attributes[:last_name]
        user.role = attributes[:role]
        user.status = :active
        user.password = "password123"
      end
    end

    puts "Seeding currencies..."
    CURRENCY_DATA.each do |name, code, symbol|
      Currency.find_or_create_by!(code: code) do |currency|
        currency.name = name
        currency.symbol = symbol
      end
    end

    puts "Seeding countries..."
    COUNTRY_DATA.each do |name, code|
      Country.find_or_create_by!(code: code) do |country|
        country.name = name
      end
    end

    departments = Department.all.to_a
    currencies = Currency.all.to_a
    countries = Country.all.to_a

    puts "Seeding #{EMPLOYEE_COUNT} employees and their salaries..."

    existing_employee_count = Employee.where("employee_id LIKE 'EMP%'").count
    timestamp = Time.current

    (0...EMPLOYEE_COUNT).each_slice(EMPLOYEE_BATCH_SIZE) do |batch_indexes|
      employee_rows = []
      salary_rows = []

      batch_indexes.each do |index|
        sequence = existing_employee_count + index + 1
        id = SecureRandom.uuid
        first_name = FIRST_NAMES.sample
        last_name = LAST_NAMES.sample
        country = countries.sample
        department = departments.sample
        currency = currencies.sample
        joining_date = rand(5.years.ago.to_date..Date.current)
        status = rand < 0.1 ? "inactive" : "active"

        employee_rows << {
          id: id,
          employee_id: format("EMP%05d", sequence),
          first_name: first_name,
          last_name: last_name,
          email: "#{first_name.downcase}.#{last_name.downcase}.#{sequence}@example.com",
          designation: DESIGNATIONS.sample,
          country_id: country.id,
          department_id: department.id,
          joining_date: joining_date,
          status: status,
          created_at: timestamp,
          updated_at: timestamp
        }

        salary_rows << {
          id: SecureRandom.uuid,
          employee_id: id,
          amount: rand(300_00..2_500_00) / 100.0,
          currency_id: currency.id,
          effective_from: joining_date,
          created_at: timestamp,
          updated_at: timestamp
        }
      end

      Employee.insert_all!(employee_rows)
      Salary.insert_all!(salary_rows)

      puts "  ...#{batch_indexes.last + 1}/#{EMPLOYEE_COUNT}"
    end

    puts "Done. Totals - Departments: #{Department.count}, Users: #{User.count}, Currencies: #{Currency.count}, " \
         "Countries: #{Country.count}, Employees: #{Employee.count}, Salaries: #{Salary.count}"
  end

  desc "Delete all application data (employees, salaries, departments, currencies, countries, users). " \
       "Run manually - never automatic on deploy."
  task clear: :environment do
    ActiveRecord::Base.transaction do
      # Children before parents, so foreign key constraints never block a delete.
      [ Salary, Employee, Department, Country, Currency, User ].each do |model|
        count = model.count
        model.delete_all
        puts "Deleted #{count} #{model.name.underscore.pluralize}"
      end
    end

    puts "Done. All demo data cleared."
  end
end
