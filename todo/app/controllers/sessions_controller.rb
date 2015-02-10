class SessionsController < ApplicationController
  def new

  end

  def create
  	user_params = params.require(:user).permit(:email,:password)
  	user = User.confirm(user_params[:email], user_params[:password])
  	if user
  		login(user)
  		redirect_to user_path(user.id)
  	else
  		flash[:error] = "You failed"
  		redirect_to '/login'
  	end
  end

  def destroy
    logout
    redirect_to '/login'
  end
end
