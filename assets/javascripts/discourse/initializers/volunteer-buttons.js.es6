import { withPluginApi } from 'discourse/lib/plugin-api';
import AjaxLib from 'discourse/lib/ajax';


function initializePlugin(api)
{
  const siteSettings = api.container.lookup('site-settings:main');

  if (siteSettings.volunteerbuttons_enabled)
  {
    api.decorateCooked(volunteerSyntax);
  }
}

export default function volunteerSyntax($elem, post)
{
	if (!post) { return; }
	var 	age 	= new Date() - new Date(topic.created_at),
      		buttons = $elem.find(".volunteer-button"),
      		user 	= Discourse.User.currentProp('username');

	if(!buttons){return;};
	if(!user){
	 // $(buttons).after('log in to volunteer');
	  $(buttons).prop("disabled",true);
	  $(buttons).attr("title","log in to volunteer");
	  return;
	};
	//if (!user || age >= 86400000) { 
	if (age >= 86400000) { 
	  $(buttons).remove();
	  return;
	};
    $(buttons).click(function(obj) {
		var elem = $(obj.currentTarget),
			show = this.getAttribute("show"),
			type = this.getAttribute("volunteer");
		if(obj.altKey){
			var new_user = prompt("Enter a valid username:", user );
			if (new_user === null || new_user === false ) { 
				return; 
			}else{
				user = new_user;
			}
		}else{
			if(elem.hasClass("volunteered")){
				var remove =  confirm("Are you sure you want to un-volunteer?");
				if (remove === false) { return; }
				$(elem).next('a.mention').hide();
			}
		}

		elem.after('<button class="btn btn-small volunteering" disabled><i class="fa fa-spinner fa-spin"></i> Updating...</button>');
		elem.hide();
		AjaxLib.ajax({
			url: 'http://api.vigglerumors.com/volunteer/'+ type +'/'+ show,
			type: 'PUT',
			data: 'user=' + user + (remove == true ? '&unvolunteer=true':'')
		});

    });
}

export default {
  name: 'volunteerbuttons',
  initialize: function(container)
  {
    withPluginApi('0.1', api => initializePlugin(api));
  }
};