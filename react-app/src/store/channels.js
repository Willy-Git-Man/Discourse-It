
const GET_ALL_CHANNELS = "channels/GET_ALL_CHANNELS";
const POST_CHANNELS = "channels/POST_CHANNELS";

const getAllChannels = (channel) => ({
  type: GET_ALL_CHANNELS,
  payload: channel,
});

const postChannel = (channel) => ({
  type: POST_CHANNELS,
  payload: channel,
});

export const getAllChannelsThunk = () => async (dispatch) => {
  const response = await fetch("/api/channels");
  console.log('response:', response)

  if (response.ok) {
    const channelsRes = await response.json();
    dispatch(getAllChannels(channelsRes));
  }
  return response;
};

export const postChannelThunk = (channel) => async (dispatch) => {
  const response = await fetch("/api/channels", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(channel),
  });
  if (response.ok) {
    const newChannel = await response.json();
    dispatch(postChannel(newChannel));
    return newChannel;
  }
};

const initialState = { channels: {} };

const channelsReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case GET_ALL_CHANNELS:
      newState = {...state}
      console.log('action:', action)
      action.payload.forEach((channel) => newState.channels[channel.id] = channel)
      return newState

    // case POST_CHANNELS:
    //   newState = {...state, channels: {...state.channels} }
    //   newState.channels[action.payload]





    default:
      return state;
  }
};

export default channelsReducer
