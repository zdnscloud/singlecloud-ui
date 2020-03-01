/*
 * CicdsPage Messages
 *
 * This contains all the text for the CicdsPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.CicdsPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'CicdsPage',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of CicdsPage',
  },
  cicds: {
    id: `${scope}.cicds`,
    defaultMessage: 'cicds',
  },
  tableTitleName: {
    id: `${scope}.tableTitleName`,
    defaultMessage: 'Name',
  },
  tableTitleStatus: {
    id: `${scope}.tableTitleStatus`,
    defaultMessage: 'Status',
  },
  tableTitleCreationTimestamp: {
    id: `${scope}.tableTitleCreationTimestamp`,
    defaultMessage: 'CreationTimestamp',
  },
  tableTitleActions: {
    id: `${scope}.tableTitleActions`,
    defaultMessage: 'Actions',
  },
  createPageTitle: {
    id: `${scope}.createPageTitle`,
    defaultMessage: 'Create cicd',
  },
  createPageDesc: {
    id: `${scope}.createPageDesc`,
    defaultMessage: 'Description of Create cicd',
  },
  createCicd: {
    id: `${scope}.createCicd`,
    defaultMessage: 'Create cicd',
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
    defaultMessage: 'InjectServiceMesh',
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
  formVolumeName:{
    id: `${scope}.formVolumeName`,
    defaultMessage: 'VolumeName',
  },
  formVolumeMountPath:{
    id: `${scope}.formVolumeMountPath`,
    defaultMessage: 'VolumeMountPath',
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
    defaultMessage: 'Update cicd',
  },
  updatePageDesc: {
    id: `${scope}.updatePageDesc`,
    defaultMessage: 'Description of Update cicd',
  },
  updateCicd: {
    id: `${scope}.updateCicd`,
    defaultMessage: 'Update cicd',
  },
  update: {
    id: `${scope}.update`,
    defaultMessage: 'Update',
  },
  cancle: {
    id: `${scope}.cancle`,
    defaultMessage: 'Cancle',
  },
});
