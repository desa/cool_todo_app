module SessionsHelper
	def login(user)
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
		@current_user ||= User.find(session[:user_id])
	end
end
