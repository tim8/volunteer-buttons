import { registerOption } from 'pretty-text/pretty-text';

registerOption((siteSettings, opts) => {
  opts.features['volunteer-buttons'] = true;
});

function addButton(buffer, matches, state) {
  let type  = matches[1];
  let show  = matches[2];
  let tag   = 'button';
  let icon  = null;
  let token;

  if(type === 'vs'){
    type  = 'sound';
    icon  = 'vri-tv-v';
  }else if (type === 'vt'){
    type  = 'trivia';
    icon  = 'vri-live';
  }

  if(matches[3]){
    let user  = matches[3];
    let title = user + ' has volunteered for this ' + type;
    let href  = '/users/' + user.toLowerCase();
    icon  = 'fa fa-check-square-o';
    

    token = new state.Token('volunteer_open', 'span', 1);
    token.attrs = [['class', 'volunteer']];
    buffer.push(token);

    token = new state.Token('button_open', 'button', 1);
    token.attrs = [
      ['class', 'btn btn-small volunteer-button volunteered'],
      ['show',show],
      ['volunteer',type],
      ['user',user],
      ['title',title]
    ];
    buffer.push(token);

    token = new state.Token('icon_open', 'i', 1);
    token.attrs = [['class', icon]];
    buffer.push(token);
    token = new state.Token('icon_close', 'i', -1);
    buffer.push(token);


    token = new state.Token('mention_open', 'a', 1);
    token.attrs = [
      ['class', 'mention'],
      ['href',href]
    ];
    buffer.push(token);

    token = new state.Token('text', '', 0);
    token.content = '@'+username;
    buffer.push(token);

    token = new state.Token('mention_close', tag, -1);
    buffer.push(token);

    token = new state.Token('buttton_close', tag, -1);
    buffer.push(token);

    token = new state.Token('volunteer_close', tag, -1);
    buffer.push(token);
  } else {
    let title = 'Volunteer for this ' + type;

    token = new state.Token('button_open', 'button', 1);
    token.attrs = [
      ['class', 'btn btn-small volunteer-button'],
      ['show',show],
      ['volunteer',type],
      ['title',title]
    ];
    buffer.push(token);

    token = new state.Token('icon_open', 'i', 1);
    token.attrs = [['class', icon]];
    buffer.push(token);
    token = new state.Token('icon_close', 'i', -1);
    buffer.push(token);

    token = new state.Token('text', '', 0);
    token.content = ' Volunteer';
    buffer.push(token);

    token = new state.Token('buttton_close', tag, -1);
    buffer.push(token);

  }

}

export function setup(helper) {
  helper.whiteList([ 
    'span[volunteer]',
    'button[volunteer]',
    'button[show]',
    'button[title]',
    'button[disabled]',
    'button[user]',
    'button.btn btn-small volunteer-button',
    'button.btn btn-small volunteer-button volunteered',
    'span.chcklst-stroked',
    'span.chcklst-box fa fa-square-o',
    'span.chcklst-box fa fa-square',
    'span.chcklst-box fa fa-minus-square-o',
    'span.chcklst-box checked fa fa-check-square',
    'span.chcklst-box checked fa fa-check-square-o',
    'i[class]',
    'font[color]'
  ]);
  helper.whiteList({
    custom(tag, name, value) {
      if (tag === 'button' && name === 'show') {
        return  /^[a-zA-Z]{2}\d{12}/.exec(value);
      }
    }
  });
  helper.whiteList({
    custom(tag, name, value) {
      if (tag === 'span' && name === 'style') {
        return /^background-color:.*$/.exec(value);
      }
    }
  });

  helper.registerPlugin(md => {
    md.core.textPostProcess.ruler.push('volunteerbuttons', {
       matcher: /\[(vs|vt|VS|VT)\:([a-zA-Z]{2}\d{12})(?:\:([A-Za-z0-9_-]))?\]/,
       onMatch: addButton
    });
  });
}