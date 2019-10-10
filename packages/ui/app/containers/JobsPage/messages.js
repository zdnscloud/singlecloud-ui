/*
 * JobsPage Messages
 *
 * This contains all the text for the JobsPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.JobsPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'JobsPage',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of JobsPage',
  },
  jobs: {
    id: `${scope}.jobs`,
    defaultMessage: 'jobs',
  },
  pods: {
    id: `${scope}.pods`,
    defaultMessage: 'Pods',
  },
  jobDetail: {
    id: `${scope}.jobDetail`,
    defaultMessage: 'Job Detail',
  },
  tableTitleName: {
    id: `${scope}.tableTitleName`,
    defaultMessage: 'Name',
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
    defaultMessage: 'Create Job',
  },
  createPageDesc: {
    id: `${scope}.createPageDesc`,
    defaultMessage: 'Description of Create Job',
  },
  createJob: {
    id: `${scope}.createJob`,
    defaultMessage: 'Create Job',
  },
  save: {
    id: `${scope}.save`,
    defaultMessage: 'Save',
  },
  cancle: {
    id: `${scope}.cancle`,
    defaultMessage: 'Cancle',
  },
  formAddContainer: {
    id: `${scope}.formAddContainer`,
    defaultMessage: 'AddContainer',
  },
  formName: {
    id: `${scope}.formName`,
    defaultMessage: 'Name',
  },
  formReplicas: {
    id: `${scope}.formReplicas`,
    defaultMessage: 'Replicas',
  },
  formContainers: {
    id: `${scope}.formContainers`,
    defaultMessage: 'Containers',
  },
  formContainerName: {
    id: `${scope}.formContainerName`,
    defaultMessage: 'ContainerName',
  },
  formImage: {
    id: `${scope}.formImage`,
    defaultMessage: 'Image',
  },
  formCommand: {
    id: `${scope}.formCommand`,
    defaultMessage: 'Command',
  },
  formArgs: {
    id: `${scope}.formArgs`,
    defaultMessage: 'Args',
  },
  formENV: {
    id: `${scope}.formENV`,
    defaultMessage: 'ENV',
  },
  formENVName: {
    id: `${scope}.formENVName`,
    defaultMessage: 'Name',
  },
  formENVValue: {
    id: `${scope}.formENVValue`,
    defaultMessage: 'Value',
  },
  formConfigName: {
    id: `${scope}.formConfigName`,
    defaultMessage: 'ConfigName',
  },
  formNone: {
    id: `${scope}.formNone`,
    defaultMessage: 'None',
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
  formVolumeType: {
    id: `${scope}.formVolumeType`,
    defaultMessage: 'VolumeType',
  },
  formVolumeName: {
    id: `${scope}.formVolumeName`,
    defaultMessage: 'VolumeName',
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
  formSchedule: {
    id: `${scope}.formSchedule`,
    defaultMessage: 'Schedule',
  },
  formRestartPolicy: {
    id: `${scope}.formRestartPolicy`,
    defaultMessage: 'RestartPolicy',
  },
  formVolumes: {
    id: `${scope}.formVolumes`,
    defaultMessage: 'Volumes',
  },
  formServiceConfig: {
    id: `${scope}.formServiceConfig`,
    defaultMessage: 'ServiceConfig',
  },
});
