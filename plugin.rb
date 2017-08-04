# name: volunteer buttons
# about: click to volunteer
# version: 2
# author: mrl
# Supported Discourse version: v1.3

# register_asset 'javascripts/volunteer.js.erb', :server_side
# register_asset 'javascripts/volunteer_buttons.js'

register_css <<CSS
	button.volunteered .fa{
		margin: 0px;
	}
	button.volunteer-button{
		float: none!important;
	}
	button.volunteer-button{
		padding: 1px 8px;
		line-height: 14px;
		border: 1px solid transparent;
		margin-right:5px;
	}

	button.btn.btn-small.volunteer-button.volunteered:hover{
		color:#a94442;
		background-color: #f2dede;
		border-color: #ebccd1;
	}
	button.btn.btn-small.volunteered,button.btn.btn-small.volunteer-button:hover{
		color:#3c763d;
		background-color: #dff0d8;
		border-color: #d6e9c6;
	}
	button.volunteer-button{
		color: #31708f;
		background-color: #d9edf7;
		border-color: #bce8f1;
	}
CSS
