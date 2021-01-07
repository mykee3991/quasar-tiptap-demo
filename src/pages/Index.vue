<template>
  <div class="page-quasar-tiptap-basic">
    <quasar-tiptap
      ref="editor"
      v-bind="options"
      @update="onUpdate"
    >
      <template slot="toolbar-left">
        <o-menubar-btn
          icon="preview"
          tooltip="Preview"
          @click.native="preview = true"
        />
      </template>
    </quasar-tiptap>
    <q-dialog v-model="preview" maximized>
      <q-card>
        <q-bar class="bg-transparent">
          <div class="col">
            Preview
          </div>
          <q-btn dense flat round icon="close" size="8.5px" color="grey" v-close-popup >
            <q-tooltip>
              Close
            </q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section class="row items-center">
          <div class="tiptap">
            <div class="editor__content" v-html="html"></div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
} from "@vue/composition-api";
import { State, Method } from "components/models.ts";
import { Placeholder } from "tiptap-extensions";

import {
  RecommendedExtensions,
  QuasarTiptap,
  OMenubarBtn,
} from "quasar-tiptap";

import DEFAULT_LOCALE from "../i18n";
import "quasar-tiptap/lib/index.css";

export default defineComponent({
  name: "SimpleEditorComponent",
  setup(_, { root, emit }: any) {
    const data: State = {
      subject: "",
      options: {
        content: "",
        // autoFocus: true,
        editable: true,
        showToolbar: true,
        showBubble: true,
        extensions: [
          // TipTap
          "Bold",
          "Italic",
          "Strike",
          "Underline",
          "Code",
          "CodeBlock",
          "CodeBlockHighlight",
          "BulletList",
          "OrderedList",
          "ListItem",
          "TodoList",
          "HorizontalRule",
          "Table",
          "Link",

          // QuasarTipTap
          // 'OTitle',
          // 'ODoc',
          "OParagraph",
          "OBlockquote",
          "OTodoItem",
          "OHeading",
          "OAlignment",
          "OIndent",
          "OLineHeight",
          "OForeColor",
          "OBackColor",
          "OFontFamily",
          "OIframe",
          "ODiagram",
          "OKatexBlock",
          "OKatexInline",
          "OFormatClear",
          "OPrint",
          "OImage",
          "OEmbed",
        ],
        toolbar: [],
        bubble: [
          "bold",
          "italic",
          "separator",
          "font-family",
          "fore-color",
          "back-color",
          "separator",
          "link",
          "separator",
          "align-group",
        ],
      },
    };
    const methods: Method = {};

    data.json = "";
    data.html = "";
    methods.onUpdate = ({
      state,
      getJSON,
      getHTML,
    }: {
      state: any;
      getJSON: any;
      getHTML: any;
    }) => {
      data.json = getJSON();
      data.html = getHTML();
    };

    data.preview = false

    const state = reactive(data);
    return { ...toRefs(state), onUpdate: methods.onUpdate };
  },
  components: {
    QuasarTiptap,
    OMenubarBtn,
  },
});
</script>

<style lang="scss">
.page-quasar-tiptap-basic {
  min-height: 40vh;
  .banner {
    position: relative;
    height: 100px;

    .options {
      position: absolute;
      bottom: 0;
      height: 40px;
      padding: 0 1rem;
    }
  }

  .tiptap {
    // border: solid 1px #eeeeee;
    border-radius: 6px;
  }

  .editor__content {
    .ProseMirror {
      min-height: 40vh;
    }
  }

  .editor-scroll-area {
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    bottom: 0;
    background: #f7f8fa;
  }
}
</style>