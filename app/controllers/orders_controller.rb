class OrdersController < ApplicationController
  before_action :authenticate_user!
  before_action :move_to_index, only: :index

  def index
    @item = Item.find(params[:item_id])
    @order_address = OrderAddress.new
  end

  def create
    @item = Item.find(params[:item_id])
    @order_address = OrderAddress.new(order_params)
    if @order_address.valid?
      pay_item
      @order_address.save
      redirect_to root_path
    else
      render :index
    end
  end

  private

  def order_params
    params.require(:order_address).permit(:postal_code, :prefecture_id, :city, :address, :building, :phone_number).merge(user_id: current_user.id, item_id: params[:item_id], token: params[:token]) 
  end

  def pay_item
    Payjp.api_key = ENV["PAYJP_SECRET_KEY"]
      Payjp::Charge.create(
        amount: Item.find(params[:item_id]).price,
        card: order_params[:token],
        currency: 'jpy'
      )
  end

  def move_to_index
    @item = Item.find(params[:item_id])
    if @item.order.present?
      redirect_to root_path
    elsif current_user.id == @item.user_id
      redirect_to root_path
    end
  end
end
