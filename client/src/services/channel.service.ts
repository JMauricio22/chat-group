import { AxiosResponse } from 'axios';
import { fetch } from '@services/config';
import { ChannelInfo } from '@models/channel.model';

export const getAllChannels = async () => {
  const resp: AxiosResponse<ChannelInfo[]> = await fetch.get('/channels');
  return resp.data;
};
