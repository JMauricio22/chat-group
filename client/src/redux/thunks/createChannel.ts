import { AppDispatch } from '@redux/store';
import { CreateChannelDTO } from '@models/channel.model';
import { createChannel } from '@services/channel.service';
import {
  creatingChannel,
  addNewChannel,
  errorToCreateChannel,
} from '@redux/reducers/channels.reducer';

export const createNewChannel = (body: CreateChannelDTO, callback: Function) =>
  async function (dispatch: AppDispatch) {
    try {
      dispatch(creatingChannel());
      const data = await createChannel(body);
      dispatch(addNewChannel(data));
      callback();
    } catch (error: any) {
      dispatch(errorToCreateChannel(error.message));
    }
  };
