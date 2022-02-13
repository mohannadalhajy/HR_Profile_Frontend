import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { TinaProvider, TinaCMS } from 'tinacms';
import { GitMediaStore, GitClient } from '@tinacms/git-client'
import { BASEURL, TinaURL } from './constants/index';
//import reportWebVitals from './reportWebVitals';
import store from './store';
import { Provider } from 'react-redux';

const client = new GitClient(TinaURL);

class MyGitMediaStore extends GitMediaStore {
  previewSrc(src) {
    return /jpg|jpeg|png|svg|gif$/.test(src.toLowerCase())
      ? src.replace('public', BASEURL)
      : null
  }
}
const cms = new TinaCMS({
  sidebar: true,
  apis: {
    git: client,
  },
  media: new MyGitMediaStore(client),
});


store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback="Loading...">
      <Provider store={store}>
        <TinaProvider cms={cms}>
          <App />
        </TinaProvider>
      </Provider>
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
