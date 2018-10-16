import {
  CHOOSE_BOX, //登录框
  CHANGE_USER_INFO, // 用户信息
  CHANGE_PLAY_LIST, // 音乐list
  CHANGE_CURR_MUSIC,// 当前歌曲
  ADD_PLAY_ITEM, // 添加一条音乐
  DELETE_PLAY_ITEM, //删除一条音乐
  CLEAR_CURR_MUSIC, // 清空音乐
} from './actions';
const initState = {
	playList: [], // 播放列表
	currMusic: { // 当前音乐
		index: 0, // 索引
		info: null, // 信息
		url: null, // 文件地址
		isPlay: false, // 是否播放
		lrc: [], // 歌词
	},
	logBox: { // 登录框
		name: '登录',
		show: false,
	},
	userInfo: null, // 用户信息
};
// 音乐列表
function playList(state = initState.playList, action){
	switch(action.type){
		case 'CHANGE_PLAY_LIST':
			// 保存音乐列表
			localStorage.playList = JSON.stringify(action.list);
      return action.list;
    case 'ADD_PLAY_ITEM':
    	// 添加
    	let pl = Object.assign([], state); // copy
      pl.unshift(action.item);
      localStorage.playList = JSON.stringify(pl);
      return pl;
   	case DELETE_PLAY_ITEM:
   		// 删除
      pl = Object.assign([], state);
      pl.splice(action.index, 1);
      return pl;
    default:
      return state;
	}
}
// 当前音乐
function currMusic(state = initState.currMusic, action){
	switch(action.type){
		case 'CHANGE_CURR_MUSIC':
			//改变当前音乐
			const index = action.index === 0 ? 0 : action.index || state.index;
      const music = {
        index: action.index || index,
        info: action.info || state.info,
        url: action.url || state.url,
        isPlay: false,
        lrc: action.lrc || state.lrc,
      };
      // 储存当前音乐
      localStorage.currMusic = JSON.stringify(music);
      // 是否播放
      const isPlay = action.isPlay === false ? false : action.isPlay || state.isPlay;
      music.isPlay = isPlay;
      return music;
    case CLEAR_CURR_MUSIC:
    	// 清空当前音乐
      localStorage.currMusic = '';
      return state.currMusic;
    default:
      return state;
	}
}
// login
function logBox(state = initState.logBox, action){
	switch (action.type) {
		case CHOOSE_BOX:
			return {
				name: action.name,
				show: action.show
			}
		default:
			return state;
	}
}
// 用户
function userInfo(state = initState.userInfo, action){
	switch(action.type){
		case CHANGE_USER_INFO:
			if (!action.info) {
				localStorage.userInfo = '';
			} else {
				localStorage.userInfo = JSON.stringify(action.info);
			}
			return action.info;
		default:
		  return state;
	}
}
// 抛出
export default { logBox, userInfo, currMusic, playList };
