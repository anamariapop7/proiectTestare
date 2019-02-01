import { UPDATE_FILTER, UPDATE_LANGUAGE} from './types';


export const updateFilters = (filters) => dispatch => {

  dispatch({
    type: UPDATE_FILTER,
    payload: filters,
  });

}
export const updateLanguage = (language) => dispatch => {
  dispatch({
    type: UPDATE_LANGUAGE,
    payload: language,
  });
}
