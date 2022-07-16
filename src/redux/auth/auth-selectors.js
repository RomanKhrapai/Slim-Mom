const getIsFetchingCurent = state => state.auth.isFetchingCurrentUser;
const getIsLoading = state => state.auth.isLoading;
const getIsAuthorised = state => state.auth.isAuthorised;

const authSelectors = {
  getIsFetchingCurent,
  getIsAuthorised,
  getIsLoading,
};
export default authSelectors;
