import { registerOption } from 'pretty-text/pretty-text';

registerOption((siteSettings, opts) => {
  opts.features['volunteer-buttons'] = true;
});

function buttonize(buffer, matches, state) {
  console.log(matches);
  let type  = matches[1];
  let show  = matches[2];
  let tag   = 'button';
  let icon  = null;

  if(type === 'vs'){
    type  = 'sound';
    icon  = 'vri-tv-v';
  }else if (type === 'vt'){
    type  = 'trivia';
    icon  = 'vri-live';
  }

  if(matches[3]){
    let user = matches[3];
    icon  = 'fa fa-check-square-o';
    let token = new state.Token('volunteer_open', 'span', 1);
    token.attrs = [['class', 'volunteer']];
    buffer.push(token);

    token = new state.Token('button_open', 'button', 1);
    token.attrs = [
      ['class', 'btn btn-small volunteer-button volunteered'],
      ['show',show],
      ['volunteer',type],
      ['user','user'],
      ['title',user + ' has volunteered for this ' + type]
    ];
    buffer.push(token);

    token = new state.Token('icon', 'i', 0);
    token.attrs = [['class', icon]];
    buffer.push(token);


    token = new state.Token('mention_open', 'a', 1);
    token.attrs = [
      ['class', 'mention'],
      ['href','/users/' + user.toLowerCase()]
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
    let token = new state.Token('button_open', 'button', 1);
    token.attrs = [
      ['class', 'btn btn-small volunteer-button'],
      ['show',show],
      ['volunteer',type],
      ['title','Volunteer for this ' + type]
    ];
    buffer.push(token);

    token = new state.Token('icon', 'i', 0);
    token.attrs = [['class', icon]];
    buffer.push(token);

    token = new state.Token('text', '', 0);
    token.content = 'Volunteer';
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
    const buttons = {
      matcher: /\[vs:([a-z]{2}\d{12})(?:\:([a-z0-9_-]+))?\]/i,
      onMatch: buttonize
    };
    md.core.textPostProcess.ruler.push('volunteer-buttons', buttons);

  });
}