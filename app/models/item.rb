class Item < ApplicationRecord
  belongs_to :user
  has_one :order
  has_many_attached :images

  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to :category
  belongs_to :sales_status
  belongs_to :shipping_fee_status
  belongs_to :prefecture
  belongs_to :scheduled_delivery

  validates :images, presence: true
  validates :name, presence: true
  validates :info, presence: true

  with_options presence: true, numericality: { other_than: 1, message: "を入力して下さい"} do
    validates :category_id
    validates :sales_status_id
    validates :shipping_fee_status_id
    validates :prefecture_id
    validates :scheduled_delivery_id
  end

  with_options presence: true, numericality: { greater_than_or_equal_to: 300, less_than_or_equal_to: 9_999_999 },
               format: { with: /\A[0-9]+\z/ } do
    validates :price
  end
end
