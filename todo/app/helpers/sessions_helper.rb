module SessionsHelper
	def login(user)
		byebug
		session[:user_id] = user.id
		@current_user = user
	end

	def logout
		session[:user_id] = @current_user = nil
	end

	def logged_in?
		if session[:user_id] == nil
			redirect_to '/login'
		end
	end

	def current_user
		# p session[:user_id]
		# @current_user ||= User.find(session[:user_id]) if session[:user_id]
		@current_user = User.first
	end
end
