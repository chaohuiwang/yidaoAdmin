import request from '@/utils/request'

export function queryCase(condition) {
  return request({
    url: '/v1/approval-management/case/retrial/queryRetrialCase',
    method: 'post',
    data: {
      customerName: condition.customerName,
      identityNo: condition.identityNo,
      approvalNos: [condition.approvalNo],
      rejectReasonCode: condition.rejectReasonCode,
      applyChannel: condition.applyChannel,
      mobile: condition.mobile,
      approvalUser: condition.approvalUser,
      startApprovalDate: condition.startApprovalDate,
      endApprovalDate: condition.endApprovalDate,
      pageNo: condition.pageNo,
      pageSize: condition.pageSize
    }
  })
}

export function caseReview(caseNo, owner) {
  return request({
    url: '/v1/approval-management/case/retrial/'.concat(caseNo),
    method: 'put',
    data: {
      owner
    }
  })
}

export function batchCaseReview(caseNos) {
  return request({
    url: '/v1/approval-management/case/retrial',
    method: 'post',
    data: {
      caseNos
    }
  })
}
