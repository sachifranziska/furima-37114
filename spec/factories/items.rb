FactoryBot.define do
  factory :item do
    image {Faker::Lorem.sentence}
    name {Faker::Name.name}
    info {Faker::Lorem.sentence}
    category_id {2}
    sales_status_id {2}
    shipping_fee_status_id {2}
    prefecture_id {2}
    scheduled_delivery_id {2}
    price {Faker::Number.between(from: 300, to: 9999999)}
    association :user
  end
end
