class TasksController < ApplicationController

	before_action :get_user

	def index
		@tasks = @user.tasks.all
		render :index
	end

	def new
		@task = @user.tasks.new
		render :new
	end

	def create
		new_task = params.require(:task).permit(:content, :complete)
		task = @user.tasks.create(new_task)
		redirect_to "/users/#{@user.id}/tasks/#{task.id}"
	end

	def show


		task_id = params[:task_id]
		@task = @user.tasks.find(task_id)
		#@task = Task.find(task_id)
		render :show
	end

	def edit


		task_id = params[:task_id]
		@task = @user.tasks.find(task_id)
		render :edit
	end

	def update


		task_id = params[:task_id]
		task = @user.tasks.find(task_id)
		updated_attrs = params.require(:task).permit(:content, :complete)
		task.update_attributes(updated_attrs)
		redirect_to task_path
	end

	def destroy


		task_id = params[:task_id]
		task = @user.tasks.find(task_id)
		task.destroy
		redirect_to tasks_path	
	end

	private

		def get_user
			if params[:user_id]
				user_id = params[:user_id]
				@user = User.find(user_id)
			else
				task_id = params[:nested_task_id]
				@nested_task = Task.find(task_id)
			end
		end

end
