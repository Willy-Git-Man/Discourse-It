import { csrfFetch } from "./csrf";

const GET_ALL_CHANNELS = "channels/GET_ALL_CHANNELS";
const POST_CHANNELS = "channels/POST_CHANNELS";

const getAllChannels = (channels) => ({
  type: GET_ALL_CHANNELS,
  payload: channels,
});

const postChannel = (channel) => ({
  type: POST_CHANNELS,
  payload: channel,
});

const getAllChannelsThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/channels");

  if (response.ok) {
    const channels = await response.json();
    dispatch(getAllChannels(channels));
  }
  return response;
};

const postChannelThunk = (channel) => async (dispatch) => {
  const response = await csrfFetch("/api/channels", {
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

const channelReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case GET_ALL_CHANNELS:
      newState = {...state}
      action.payload.forEach((channel) => newState.channels[channel.id] = channel)
      return newState

    // case POST_CHANNELS:
    //   newState = {...state, channels: {...state.channels} }
    //   newState.channels[action.payload]





    default:
      return state;
  }
};
