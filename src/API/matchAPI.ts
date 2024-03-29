import axios from 'axios';
import { MatchType } from '../interface/interface';
import authHeader from './auth-header';
const API_URL = 'https://lugiserver.com/api/v1';
class matchService {
  createMatch = async (matchInput: MatchType) => {
    try {
      const response = await axios.post(API_URL + '/match/', matchInput, { headers: authHeader() });
      return response.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  getMatch = async (inviteCode: string | undefined) => {
    try {
      const response = await axios.get(API_URL + `/match/inviteCode/${inviteCode}/`, { headers: authHeader() });
      return response.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  finishMatch = async (inviteCode: string | undefined) => {
    try {
      const response = await axios.post(API_URL + `/match/inviteCode/${inviteCode}/finish/`, {}, { headers: authHeader() });
      return response.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

export default new matchService();
