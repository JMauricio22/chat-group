import { AppDispatch } from '@redux/store';
import {
  fetchingChannels,
  setChannels,
  setError,
} from '@redux/reducers/channels.reducer';
import { getAllChannels } from '@services/channel.service';

export async function getChannels(dispatch: AppDispatch) {
  try {
    dispatch(fetchingChannels());
    const channels = await getAllChannels();
    dispatch(setChannels(channels));
  } catch (error) {
    dispatch(setError('Cannot get all channels'));
  }
}
