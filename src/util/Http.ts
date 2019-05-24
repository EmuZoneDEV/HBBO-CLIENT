import axios from 'axios';

function getRootUrl() {
	return window.location.origin ? window.location.origin +'/' : window.location.protocol + '/' + window.location.host + '/';
}


let instance = axios.create({
	baseURL: getRootUrl() + 'api/',
	headers: {'Authorization': 't5rZR4h7'}
  });

export default instance;