/*
 * UserQuotasPage Messages
 *
 * This contains all the text for the UserQuotasPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.UserQuotasPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'UserQuotasPage',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of UserQuotasPage',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the UserQuotasPage container!',
  },
  userQuotas: {
    id: `${scope}.userQuotas`,
    defaultMessage: 'UserQuotas',
  },
  tableTitleName: {
    id: `${scope}.tableTitleName`,
    defaultMessage: 'Name',
  },
  tableTitleStatus: {
    id: `${scope}.tableTitleStatus`,
    defaultMessage: 'Status',
  },
  tableTitleCpu: {
    id: `${scope}.tableTitleCpu`,
    defaultMessage: 'CPU',
  },
  tableTitleMemory: {
    id: `${scope}.tableTitleMemory`,
    defaultMessage: 'Memory',
  },
  tableTitleStorage: {
    id: `${scope}.tableTitleStorage`,
    defaultMessage: 'Storage',
  },
  tableTitleReplicas: {
    id: `${scope}.tableTitleReplicas`,
    defaultMessage: 'Replicas',
  },
  tableTitleCreationTimestamp: {
    id: `${scope}.tableTitleCreationTimestamp`,
    defaultMessage: 'CreationTimestamp',
  },
  tableTitleActions: {
    id: `${scope}.tableTitleActions`,
    defaultMessage: 'Actions',
  },
  tableProcessing: {
    id: `${scope}.tableProcessing`,
    defaultMessage: 'Processing',
  },
  tableApproval: {
    id: `${scope}.tableApproval`,
    defaultMessage: 'Approval',
  },
  tableRejection: {
    id: `${scope}.tableRejection`,
    defaultMessage: 'Rejection',
  },
  createUserQuota: {
    id: `${scope}.createUserQuota`,
    defaultMessage: 'Create UserQuota',
  },
  createUserQuotaButton: {
    id: `${scope}.createUserQuotaButton`,
    defaultMessage: 'Save',
  },
  cancleUserQuotaButton: {
    id: `${scope}.cancleUserQuotaButton`,
    defaultMessage: 'Cancle',
  },
  searchUserQuotaButton: {
    id: `${scope}.searchUserQuotaButton`,
    defaultMessage: 'Search',
  },
  searchFormUserName: {
    id: `${scope}.searchFormUserName`,
    defaultMessage: 'UserName',
  },
  searchFormStatus: {
    id: `${scope}.searchFormStatus`,
    defaultMessage: 'Status',
  },
  selectAll: {
    id: `${scope}.selectAll`,
    defaultMessage: 'All',
  },
  userQuotaDetail: {
    id: `${scope}.userQuotaDetail`,
    defaultMessage: 'UserQuota Detail',
  },
  save: {
    id: `${scope}.save`,
    defaultMessage: 'Save',
  },
  formAddContainer: {
    id: `${scope}.formAddContainer`,
    defaultMessage: 'AddContainer',
  },
  formNamespace: {
    id: `${scope}.formNamespace`,
    defaultMessage: 'Namespace',
  },
  formCPU: {
    id: `${scope}.formCPU`,
    defaultMessage: 'CPU',
  },
  formMemory: {
    id: `${scope}.formMemory`,
    defaultMessage: 'Memory',
  },
  formStorage: {
    id: `${scope}.formStorage`,
    defaultMessage: 'Storage',
  },
  formCPUEndAdornment: {
    id: `${scope}.formCPUEndAdornment`,
    defaultMessage: 'He',
  },
  formPurpose: {
    id: `${scope}.formPurpose`,
    defaultMessage: 'Purpose',
  },
  formClusterName: {
    id: `${scope}.formClusterName`,
    defaultMessage: 'ClusterName',
  },
  formRejectionReason: {
    id: `${scope}.formRejectionReason`,
    defaultMessage: 'RejectionReason',
  },
  detail: {
    id: `${scope}.detail`,
    defaultMessage: 'Detail',
  },
  passBtn: {
    id: `${scope}.passBtn`,
    defaultMessage: 'Pass',
  },
  rejectBtn: {
    id: `${scope}.rejectBtn`,
    defaultMessage: 'Reject',
  },
  formNone: {
    id: `${scope}.formNone`,
    defaultMessage: 'None',
  },
  adminRequestListPage: {
    id: `${scope}.adminRequestListPage`,
    defaultMessage: 'AdminRequestListPage',
  },
  adminRequestList: {
    id: `${scope}.adminRequestList`,
    defaultMessage: 'AdminRequestList',
  },
  requestList: {
    id: `${scope}.requestList`,
    defaultMessage: 'RequestList',
  },
  requestDetail: {
    id: `${scope}.requestDetail`,
    defaultMessage: 'RequestDetail',
  },
  requestType: {
    id: `${scope}.requestType`,
    defaultMessage: 'RequestType',
  },
  editPage: {
    id: `${scope}.editPage`,
    defaultMessage: 'EditPage',
  },
  edit: {
    id: `${scope}.edit`,
    defaultMessage: 'Edit',
  },
  formMountPath: {
    id: `${scope}.formMountPath`,
    defaultMessage: 'MountPath',
  },
  formExposedPorts: {
    id: `${scope}.formExposedPorts`,
    defaultMessage: 'ExposedPorts',
  },
  formPortName: {
    id: `${scope}.formPortName`,
    defaultMessage: 'PortName',
  },
  formPortProtocol: {
    id: `${scope}.formPortProtocol`,
    defaultMessage: 'PortProtocol',
  },
  formPort: {
    id: `${scope}.formPort`,
    defaultMessage: 'Port',
  },
  formAdvancedOptions: {
    id: `${scope}.formAdvancedOptions`,
    defaultMessage: 'AdvancedOptions',
  },
  formReloadWhenConfigChange: {
    id: `${scope}.formReloadWhenConfigChange`,
    defaultMessage: 'ReloadWhenConfigChange',
  },
  formExposedServiceType: {
    id: `${scope}.formExposedServiceType`,
    defaultMessage: 'ExposedServiceType',
  },
  formAutoCreateService: {
    id: `${scope}.formAutoCreateService`,
    defaultMessage: 'AutoCreateService',
  },
  formServicePort: {
    id: `${scope}.formServicePort`,
    defaultMessage: 'ServicePort',
  },
  formAutoCreateIngress: {
    id: `${scope}.formAutoCreateIngress`,
    defaultMessage: 'AutoCreateIngress',
  },
  formIngressDomain: {
    id: `${scope}.formIngressDomain`,
    defaultMessage: 'IngressDomain',
  },
  formIngressPath: {
    id: `${scope}.formIngressPath`,
    defaultMessage: 'IngressPath',
  },
  formIngressPort: {
    id: `${scope}.formIngressPort`,
    defaultMessage: 'IngressPort',
  },
  formExposedMetricPath: {
    id: `${scope}.formExposedMetricPath`,
    defaultMessage: 'ExposedMetricPath',
  },
  formExposedMeticPort: {
    id: `${scope}.formExposedMeticPort`,
    defaultMessage: 'ExposedMeticPort',
  },
  formVolumes: {
    id: `${scope}.formVolumes`,
    defaultMessage: 'Volumes',
  },
  formServiceConfig: {
    id: `${scope}.formServiceConfig`,
    defaultMessage: 'ServiceConfig',
  },
  formAddVolumeClaimTemplate: {
    id: `${scope}.formAddVolumeClaimTemplate`,
    defaultMessage: 'Addd Volume Claim Template',
  },
  formVolumeClaimTemplate: {
    id: `${scope}.formVolumeClaimTemplate`,
    defaultMessage: 'Volume Claim Template',
  },
  formVolumeClaimTemplateName: {
    id: `${scope}.formVolumeClaimTemplateName`,
    defaultMessage: 'Name',
  },
  formVolumeClaimTemplateSize: {
    id: `${scope}.formVolumeClaimTemplateSize`,
    defaultMessage: 'Size',
  },
  formVolumeClaimTemplateStorageClassName: {
    id: `${scope}.formVolumeClaimTemplateStorageClassName`,
    defaultMessage: 'Storage Class Name',
  },
});
