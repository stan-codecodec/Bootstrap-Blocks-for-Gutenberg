const { __ } = wp.i18n; // Import __() from wp.i18n

import {
  registerBlockType,
  InnerBlocks,
  InspectorControls
} from "@wordpress/blocks";
import { Fragment } from "@wordpress/element";
import {
  SelectControl,
  ToggleControl,
  PanelBody
} from "@wordpress/components";

import "./style.scss";

registerBlockType("bsgut/alert-block", {
  title: __("Alert"),
  icon: "welcome-learn-more",
  category: "common",
  description: __(
    "Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages."
  ),
  keywords: ["bootstrap", "bsgut", "message"],
  attributes: {
    type: {
      type: "string",
      default: "info"
    },
    dismissable: {
      type: "boolean",
      default: false
    },
    title: {
      type: "string",
      selector: 'h4.alert-heading'
    }
  },

  edit({ className, attributes, setAttributes, isSelected }) {
    const { type, dismissable, title } = attributes;

    const updateType = type => setAttributes({ type });
    const updateDismissable = dismissable => setAttributes({ dismissable });
    const updateTitle = title => setAttributes({ title });

    return (
      <Fragment>
        <div className={className + " alert alert-" + type}>
          {dismissable == true &&
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
           }
          <InnerBlocks />
        </div>

        {isSelected && (
          <InspectorControls key="inspector">
            <PanelBody title={__( 'Alert Settings' )}>
              <SelectControl
                label= {__( "Message Type" )}
                value={type}
                options={[
                  { label: __("Primary"), value: "primary" },
                  { label: __("Secondary"), value: "secondary" },
                  { label: __("Success"), value: "success" },
                  { label: __("Danger"), value: "danger" },
                  { label: __("Warning"), value: "warning" },
                  { label: __("Info"), value: "info" },
                  { label: __("Light"), value: "light" },
                  { label: __("Dark"), value: "dark" }
                ]}
                help={__(
                  "Select the type of your alert."
                )}
                onChange={updateType}
              />
              <ToggleControl
                label={__("Dismissable")}
                checked={!!dismissable}
                help={__(
                  "Enable to display a close button on the upper right corner."
                )}
                onChange={updateDismissable}
              />
            </PanelBody>
          </InspectorControls>
        )}
      </Fragment>
    );
  },

  save({ attributes }) {
    const { type, dismissable, title } = attributes;
    return (
      <div className={"alert alert-" + type}>
        <InnerBlocks.Content />
      </div>
    );
  }
});