/*
 * StatefulSetsPage Messages
 *
 * This contains all the text for the StatefulSetsPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.StatefulSetsPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'StatefulSetsPage',
  },
  pageDesc: {
    id: `${scope}.pageDesc`,
    defaultMessage: 'Description of StatefulSetsPage',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the StatefulSetsPage container!',
  },
  statefulSets: {
    id: `${scope}.statefulSets`,
    defaultMessage: 'StatefulSets',
  },
  tableTitleName: {
    id: `${scope}.tableTitleName`,
    defaultMessage: 'Name',
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
  createStatefulSet: {
    id: `${scope}.createStatefulSet`,
    defaultMessage: 'Create StatefulSet',
  },
  pods: {
    id: `${scope}.pods`,
    defaultMessage: 'Pods',
  },
  statefulSetDetail: {
    id: `${scope}.statefulSetDetail`,
    defaultMessage: 'StatefulSet Detail',
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
  formInjectServiceMesh: {
    id: `${scope}.formInjectServiceMesh`,
    defaultMessage: 'InjectServiceMesh',
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
  successTitle: {
    id: `${scope}.successTitle`,
    defaultMessage: 'Notice',
  },
  successContent: {
    id: `${scope}.successContent`,
    defaultMessage:
      'StatefulSet has been created, would you like to create a service for it?',
  },
  formReason: {
    id: `${scope}.formReason`,
    defaultMessage: 'Reason',
  },
  formVersionInfo: {
    id: `${scope}.formVersionInfo`,
    defaultMessage: 'VersionInfo',
  },
  dialogUpgrade: {
    id: `${scope}.dialogUpgrade`,
    defaultMessage: 'Upgrade',
  },
  dialogRollback: {
    id: `${scope}.dialogRollback`,
    defaultMessage: 'Rollback',
  },
  dialogUpgradeButton: {
    id: `${scope}.dialogUpgradeButton`,
    defaultMessage: 'Upgrade',
  },
  dialogRollbackButton: {
    id: `${scope}.dialogRollbackButton`,
    defaultMessage: 'Rollback',
  },
  dialogCancelButton: {
    id: `${scope}.dialogCancelButton`,
    defaultMessage: 'Cancel',
  },
  updatePageTitle: {
    id: `${scope}.updatePageTitle`,
    defaultMessage: 'Update StatefulSet',
  },
  updatePageDesc: {
    id: `${scope}.updatePageDesc`,
    defaultMessage: 'Description of Update StatefulSet',
  },
  updateStatefulSet: {
    id: `${scope}.updateStatefulSet`,
    defaultMessage: 'Update StatefulSet',
  },
  update: {
    id: `${scope}.update`,
    defaultMessage: 'Update',
  },
  formUpdateMemo: {
    id: `${scope}.UpdateMemo`,
    defaultMessage: 'Update Memo',
  },
  formMemo: {
    id: `${scope}.Memo`,
    defaultMessage: 'Memo',
  },
  upgradeButton: {
    id: `${scope}.upgradeButton`,
    defaultMessage: 'upgrade',
  },
  rollbackButton: {
    id: `${scope}.rollbackButton`,
    defaultMessage: 'rollback',
  },
});
