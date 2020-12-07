export default {
    routes: [
        {
            path: '/claim',
            component: () => import ('../components/Pages/Main'),
            children: [
                    {
                        path: 'insurance_search',
                        component: () => import ('../components/Page/InsuranceSearch.vue'),
                    },
                {
                    path: 'insurance',
                    component: () => import('../components/Page/Insurance.vue'),
                },
                {
                    path: 'request_done',
                    component: () => import('../components/Page/RequestDone.vue'),
                },
                {
                    path: 'insurance_request',
                    component: () => import('../components/Page/InsuranceRequest.vue'),
                },
,
                {
                    path: 'wrong_grade',
                    component: () => import ('../components/Pages/WrongGrade')
                },
                {
                    path: 'wrong_partner_grade',
                    component: () => import ('../components/Pages/WrongPartnerGrade')
                },
                {
                    path: '*',
                    component: () => import ('../components/Pages/PageNotFound')
                }
            ]
        }
    ]
}
