import axios from 'axios';
import axiosClient from './axiosClient';
import postApi from './postApi';

async function main() {
  try {
    const queryParamss = {
      _page: 1,
      _limit: 5,
    };

    const data = await postApi.getAll(queryParamss);
  } catch (error) {
    console.log(error);
  }

  await postApi.updateFormData({
    id: 'sktwi1cgkkuif36do',
    title: 'Adipisci a enim 444',
  });
}

main();
