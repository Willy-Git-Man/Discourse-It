


const GET_ALL_CHANNELS = "channels/GET_ALL_CHANNELS";
const POST_CHANNELS = "channels/POST_CHANNELS";
const DELETE_CHANNELS = "channels/DELETE_CHANNELS";


const getAllChannels = (channel) => ({
  type: GET_ALL_CHANNELS,
  channel
});

const postChannel = (channel) => ({
  type: POST_CHANNELS,
  channel
});

const deleteChannel = (channel) => ({
  type: DELETE_CHANNELS,
  channel
})

export const getAllChannelsThunk = () => async(dispatch) => {
  const response = await fetch("/api/channels/");

  if (response.ok) {
    const channelsRes = await response.json();
    dispatch(getAllChannels(channelsRes));
  }
  return response;
};

export const postChannelThunk = (channel) => async(dispatch) => {
  const {channelName, channelPicture, user_id} = channel
  const form = new FormData()
  form.append("user_id", user_id )
  form.append("channel_name", channelName )
  form.append("channel_picture", channelPicture )

  const response = await fetch("/api/channels/", {
    method: "POST",
    // headers: { "Content-Type": "application/json" },
    body: form
  });
  // console.log('response:', response)
  if (response.ok) {
    const newChannel = await response.json();
    console.log('newChannel:', newChannel)
    dispatch(postChannel(newChannel));
    return newChannel;
  }
};

export const deleteChannelThunk = (channelId) => async(dispatch) => {
  const response = await fetch(`/api/channels/${channelId}`, {
    method: "DELETE",
    headers: {'Content-Type': 'application/json'}
  })
  if (response.ok) {
    const channel = await response.json()
    dispatch(deleteChannel(channel))
  }
}

const initialState = { channels: {} };

const channelsReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case GET_ALL_CHANNELS:
      newState = {...state}
      action.channel.channels.forEach((chan) => newState.channels[chan.id] = chan)
      return newState

      case POST_CHANNELS:
      console.log('action.channel:', action.channel)
      newState = {...state, channels: {...state.channels} }
      newState.channels[action.channel.id] = {...action.channel}
      return newState

    case DELETE_CHANNELS:
      newState = {...state, channels: {...state.channels}}
      const id = action.channel.id
      console.log('id:', id)
      delete newState.channels[id]

      return newState





    default:
      return state;
  }
};

export default channelsReducer
