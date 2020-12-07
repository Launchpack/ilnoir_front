export default {
    routes: [
        {
            path: '/claim',
            component: () => import ('../components/Pages/MainPC'),
            children: [
                {
                    path: 'insurance_search',
                    component: () => import('../components/PagePc/InsuranceSearch.vue'),
                },
                {
                    path: 'insurance',
                    component: () => import('../components/PagePc/Insurance.vue'),
                },
                {
                    path: 'request_done',
                    component: () => import('../components/PagePc/RequestDone.vue'),
                },
                {
                    path: 'insurance_request',
                    component: () => import('../components/PagePc/InsuranceRequest.vue'),
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
