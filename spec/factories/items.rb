FactoryBot.define do
  factory :item do
    name { Faker::Name.name }
    info { Faker::Lorem.sentence }
    category_id { 2 }
    sales_status_id { 2 }
    shipping_fee_status_id { 2 }
    prefecture_id { 2 }
    scheduled_delivery_id { 2 }
    price { Faker::Number.between(from: 300, to: 9_999_999) }

    after(:build) do |item|
      item.images.attach(io: File.open('public/images/test_image.png'), filename: 'test_image.png')
    end

    association :user
  end
end
