import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllChannelsThunk } from "../../store/channels";


export default function UserChannels() {
  const dispatch = useDispatch()

  const channelState = useSelector((state) => state.channels.channels)
  const sessionUser = useSelector((state) => state.session.user)
  console.log('sessionUser:', sessionUser)

console.log('channelState:', channelState)

  useEffect(() => {
    dispatch(getAllChannelsThunk())
  }, [dispatch])



  return (
    <div>
      Hello
    </div>
  )



}
