export function getTableSettings(columns: any, actions: boolean = true) {
  return {
    mode: 'inline',
    actions: {
      columnTitle: 'Ações',
      add: actions,
      edit: actions,
      delete: actions,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: columns,
    noDataMessage: 'Nenhum dado encontrado.',
  };
}
