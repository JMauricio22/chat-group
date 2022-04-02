import { AxiosResponse } from 'axios';
import { fetch } from '@services/config';
import { ChannelInfo, CreateChannelDTO } from '@models/channel.model';

export const getAllChannels = async () => {
  const resp: AxiosResponse<ChannelInfo[]> = await fetch.get('/channels');
  return resp.data;
};

export const createChannel = async (body: CreateChannelDTO) => {
  const resp: AxiosResponse<ChannelInfo> = await fetch.post('/channels', body);
  return resp.data;
};
