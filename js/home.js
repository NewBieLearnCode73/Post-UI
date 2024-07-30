import postApi from './postApi';
import { initSearch, renderPostList, renderPagination, initPagination } from './utils';

async function handleFilterChange(filterName, filterValue) {
  try {
    const url = new URL(window.location);
    url.searchParams.set(filterName, filterValue);

    if (filterName === 'title_like') url.searchParams.set('_page', 1);

    history.pushState({}, '', url); // update query param

    // fetch API
    const { data, pagination } = await postApi.getAll(url.searchParams);
    renderPostList('postsList', data);
    renderPagination('pagination', pagination);
  } catch (error) {
    console.log('Error handle filter change:', error);
  }
}

(async () => {
  try {
    const url = new URL(window.location);
    // update search parrams if needed
    if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1);

    if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6);

    history.pushState({}, '', url); // update query param
    const queryParams = url.searchParams;

    initPagination({
      elementId: 'pagination',
      defaultParams: queryParams,
      onChange: (page) => handleFilterChange('_page', page),
    });

    initSearch({
      elementId: 'searchInput',
      defaultParams: queryParams,
      onChange: (value) => handleFilterChange('title_like', value),
    });

    // Lấy được data
    const { data, pagination } = await postApi.getAll(queryParams);

    // render giao diện
    renderPostList('postsList', data);
    renderPagination('pagination', pagination);
  } catch (error) {
    console.log(error);
  }
})();
