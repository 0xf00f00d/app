import { Companies } from './../models/graphql';
import { useUserId, useNhostClient, useUserDefaultRole } from '@nhost/vue';

export const useCompany = () => {
  console.log('[useCompany]');
  
  const { nhost } = useNhostClient()
  const userId = useUserId()
  const isEmployer = useIsEmployer()
  const companyQuery: any = gql`
    query getCompanyQuery($employer_id: uuid!) {
      myCompany(employer_id: $employer_id) {
        id
        name
        email
        address
        telephone
      }
    }
  `
  const company = ref<Companies>()
  const isLoading = ref(true)
  const error = ref<any>()

  /* nhost.graphql.request(companyQuery, { employer_id: userId.value, })
    .then(res => {
      console.log('[res]: ', res)
      return res.data
    })
    .then(data => {
      company.value = data.companys.shift()
    })
    .catch(err => error.value = err) */

  const getCompany = async () => {
    if (!isEmployer) {
      isLoading.value = false
      return
    }
    const res = await nhost.graphql.request(companyQuery, { employer_id: userId.value, })
    
    company.value = res.data?.myCompany
    isLoading.value = false
    error.value = res.error
  }

  /* watchEffect(async () => {
    if (userId.value) {
      await getCompany()
    }
  }) */

  onMounted(async () => {
  })

  return {
    getCompany,
    company,
    isLoading,
    error,
  }
}