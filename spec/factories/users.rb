FactoryBot.define do
  factory :user do
    nickname { Faker::Name.initials }
    email { Faker::Internet.free_email }
    password = Faker::Internet.password(min_length: 6)
    password { password }
    password_confirmation { password }
    last_name { '鈴木' }
    first_name { '一郎' }
    last_name_kana { 'スズキ' }
    first_name_kana { 'イチロウ' }
    birth_date { Faker::Date.birthday }
  end
end
