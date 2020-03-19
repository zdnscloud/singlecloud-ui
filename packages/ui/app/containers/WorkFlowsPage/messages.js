/*
 * WorkFlowsPage Messages
 *
 * This contains all the text for the WorkFlowsPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.WorkFlowsPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'WorkFlowsPage',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of WorkFlowsPage',
  },
  workFlows: {
    id: `${scope}.workFlows`,
    defaultMessage: 'workFlows',
  },
  tableTitleName: {
    id: `${scope}.tableTitleName`,
    defaultMessage: 'Name',
  },
  tableTitleStatus: {
    id: `${scope}.tableTitleStatus`,
    defaultMessage: 'Status',
  },
  tableTitleActions: {
    id: `${scope}.tableTitleActions`,
    defaultMessage: 'Actions',
  },
  tableButtonModify:{
    id: `${scope}.tableButtonModify`,
    defaultMessage: 'Modify',
  },
  tableButtonRun:{
    id: `${scope}.tableButtonRun`,
    defaultMessage: 'Run',
  },
  createPageTitle: {
    id: `${scope}.createPageTitle`,
    defaultMessage: 'Create workFlow',
  },
  createPageDesc: {
    id: `${scope}.createPageDesc`,
    defaultMessage: 'Description of Create workFlow',
  },
  createWorkFlow: {
    id: `${scope}.createWorkFlow`,
    defaultMessage: 'Create workFlow',
  },
  save: {
    id: `${scope}.save`,
    defaultMessage: 'Save',
  },
  formName: {
    id: `${scope}.formName`,
    defaultMessage: 'Name',
  },
  formBuildConfiguration: {
    id: `${scope}.formBuildConfiguration`,
    defaultMessage: 'BuildConfiguration',
  },
  formGitRepositoryUrl: {
    id: `${scope}.formGitRepositoryUrl`,
    defaultMessage: 'GitRepositoryUrl',
  },
  formGitRevision: {
    id: `${scope}.formGitRevision`,
    defaultMessage: 'GitRevision',
  },
  formGitUser: {
    id: `${scope}.formGitUser`,
    defaultMessage: 'GitUser',
  },
  formGitPassword: {
    id: `${scope}.formGitPassword`,
    defaultMessage: 'GitPassword',
  },
  formImageName:{
    id: `${scope}.formImageName`,
    defaultMessage: 'ImageName',
  },
  formImageRegistryUser:{
    id: `${scope}.formImageRegistryUser`,
    defaultMessage: 'ImageRegistryUser',
  },
  formImageRegistryPassword:{
    id: `${scope}.formImageRegistryPassword`,
    defaultMessage: 'ImageRegistryPassword',
  },
  formDeploymentConfiguration:{
    id: `${scope}.formDeploymentConfiguration`,
    defaultMessage: 'DeploymentConfiguration',
  },
  formReplicas:{
    id: `${scope}.formReplicas`,
    defaultMessage: 'Replicas',
  },
  formInjectServiceMesh:{
    id: `${scope}.formInjectServiceMesh`,
    defaultMessage: 'InjectServiceMesh',
  },
  formContainerName:{
    id: `${scope}.ContainerName`,
    defaultMessage: 'ContainerName',
  },
  formContainerCommand:{
    id: `${scope}.formContainerCommand`,
    defaultMessage: 'ContainerCommand',
  },
  formContainerArgs:{
    id: `${scope}.formContainerArgs`,
    defaultMessage: 'ContainerArgs',
  },
  formEnvBtn:{
    id: `${scope}.formEnvBtn`,
    defaultMessage: 'Env',
  },
  formEnvName:{
    id: `${scope}.formEnvName`,
    defaultMessage: 'EnvName',
  },
  formEnvValue:{
    id: `${scope}.formEnvValue`,
    defaultMessage: 'EnvValue',
  },
  formVolumeBtn:{
    id: `${scope}.formVolumeBtn`,
    defaultMessage: 'Volume',
  },
  formVolumeType:{
    id: `${scope}.formVolumeType`,
    defaultMessage: 'VolumeType',
  },
  formVolumeTypeConfigMap: {
    id: `${scope}.formVolumeTypeConfigMap`,
    defaultMessage: 'Config Map',
  },
  formVolumeTypeSecret: {
    id: `${scope}.formVolumeTypeSecret`,
    defaultMessage: 'Secret',
  },
  formVolumeTypePersistentVolume: {
    id: `${scope}.formVolumeTypePersistentVolume`,
    defaultMessage: 'Persistent Volume',
  },
  formVolumeName:{
    id: `${scope}.formVolumeName`,
    defaultMessage: 'VolumeName',
  },
  formVolumeMountPath:{
    id: `${scope}.formVolumeMountPath`,
    defaultMessage: 'VolumeMountPath',
  },
  formNone: {
    id: `${scope}.formNone`,
    defaultMessage: 'None',
  },
  formExposedPortBtn:{
    id: `${scope}.formExposedPortBtn`,
    defaultMessage: 'ExposedPortBtn',
  },
  formPortName:{
    id: `${scope}.formPortName`,
    defaultMessage: 'PortName',
  },
  formPortProtocol:{
    id: `${scope}.formPortProtocol`,
    defaultMessage: 'PortProtocol',
  },
  formPort:{
    id: `${scope}.formPort`,
    defaultMessage: 'Port',
  },
  formServiceConfiguration:{
    id: `${scope}.formServiceConfiguration`,
    defaultMessage: 'ServiceConfiguration',
  },
  formAutoDeploy:{
    id: `${scope}.formAutoDeploy`,
    defaultMessage: 'AutoDeploy',
  },
  formExposedMetricPath:{
    id: `${scope}.formExposedMetricPath`,
    defaultMessage: 'ExposedMetricPath',
  },
  formExposedMetricPort:{
    id: `${scope}.formExposedMetricPort`,
    defaultMessage: 'ExposedMetricPort',
  },
  formPersistentVolumeBtn:{
    id: `${scope}.formPersistentVolumeBtn`,
    defaultMessage: 'PersistentVolume',
  },
  formPvStatus:{
    id: `${scope}.formPvStatus`,
    defaultMessage: 'PvStatus',
  },
  formPvCreate:{
    id: `${scope}.formPvCreate`,
    defaultMessage: 'Create',
  },
  formPvExist:{
    id: `${scope}.formPvExist`,
    defaultMessage: 'Exist',
  },
  formPvName:{
    id: `${scope}.formPvName`,
    defaultMessage: 'PvName',
  },
  formPvSize:{
    id: `${scope}.formPvSize`,
    defaultMessage: 'Size',
  },
  formPvStorageClassName:{
    id: `${scope}.formPvStorageClassName`,
    defaultMessage: 'StorageClassName',
  },
  updatePageTitle: {
    id: `${scope}.updatePageTitle`,
    defaultMessage: 'Update workFlow',
  },
  updatePageDesc: {
    id: `${scope}.updatePageDesc`,
    defaultMessage: 'Description of Update workFlow',
  },
  updateWorkFlow: {
    id: `${scope}.updateWorkFlow`,
    defaultMessage: 'Update workFlow',
  },
  update: {
    id: `${scope}.update`,
    defaultMessage: 'Update',
  },
  cancle: {
    id: `${scope}.cancle`,
    defaultMessage: 'Cancle',
  },
  dialogTitleRun:{
    id: `${scope}.dialogTitleRun`,
    defaultMessage: 'Run',
  },
  dialogFormImageTag:{
    id: `${scope}.dialogFormImageTag`,
    defaultMessage: 'ImageTag',
  },
  logsPageTitle: {
    id: `${scope}.logsPageTitle`,
    defaultMessage: 'WorkFlowLogsPage',
  },
  logsPageDesc: {
    id: `${scope}.logsPageDesc`,
    defaultMessage: 'Description of workFlow logs',
  },
  logsWorkFlow: {
    id: `${scope}.logsWorkFlow`,
    defaultMessage: 'workFlow Logs',
  },
  logs: {
    id: `${scope}.logs`,
    defaultMessage: 'Logs',
  },
  detailPageTitle:{
    id: `${scope}.detailPageTitle`,
    defaultMessage: 'Detail',
  },
  clearTasks: {
    id: `${scope}.clearTasks`,
    defaultMessage: 'ClearTasks',
  },
  clearTasksPromptText:{
    id: `${scope}.clearTasksPromptText`,
    defaultMessage: 'Are you sure you want to clear the history？',
  },
  tabTitleStatus:{
    id: `${scope}.tabTitleStatus`,
    defaultMessage: 'Status',
  },
  tabTitleLogs:{
    id: `${scope}.tabTitleLogs`,
    defaultMessage: 'Logs',
  },
  tabContainerStatus:{
    id: `${scope}.tabContainerStatus`,
    defaultMessage: 'Container Status',
  },
});
