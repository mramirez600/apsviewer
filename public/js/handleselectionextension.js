class HandleSelectionExtension extends Autodesk.Viewing.Extension {
  constructor(viewer, options) {
    super(viewer, options);
    this._group = null;
    this._button = null;
  }

  load() {
    console.log('HandleSelectionExtension has been loaded');
    return true;
  }

  unload() {
    if (this._group) {
      this._group.removeControl(this._button);
      if (this._group.getNumberOfControls() === 0) {
        this.viewer.toolbar.removeControl(this._group);
      }
    }
    console.log('HandleSelectionExtension has been unloaded');
    return true;
  }

  onToolbarCreated() {
    this._group = this.viewer.toolbar.getControl('ExtensionsToolbar');
    if (!this._group) {
      this._group = new Autodesk.Viewing.UI.ControlGroup('ExtensionsToolbar');
      this.viewer.toolbar.addControl(this._group);
    }

    this._button = new Autodesk.Viewing.UI.Button(
      'handleSelectionExtensionButton'
    );
    this._button.onClick = (ev) => {
      const selection = this.viewer.getSelection();
      this.viewer.clearSelection();
      if (selection.length > 0) {
        let isolated = [];
        selection.forEach((dbId) => {
          this.viewer.getProperties(dbId, (props) => {
            console.log(props);
            if (confirm(`Isolate ${props.name} (${props.externalId})`)) {
              isolated.push(dbId);
              this.viewer.isolate(isolated);
            }
          });
        });
      } else {
        this.viewer.isolate(0);
      }
    };
    this._button.setToolTip('Handle Selection Extension');
    this._button.addClass('handleSelectionExtensionIcon');
    this._group.addControl(this._button);
  }
}

Autodesk.Viewing.theExtensionManager.registerExtension(
  'HandleSelectionExtension',
  HandleSelectionExtension
);
