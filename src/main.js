import {
    InlineEditor,
    AutoLink,
    Autosave,
    Bold,
    Essentials,
    Italic,
    Heading,
    Link,
    MediaEmbed,
    Paragraph,
    Table,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    first, Markdown,
    PasteFromMarkdownExperimental,
    ImageInline,
    ImageToolbar,
    ImageBlock,
    ImageStyle,
    ImageInsertViaUrl,
    AutoImage,
    ImageTextAlternative,
    ImageResize
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

import './style.css';

const LICENSE_KEY = 'GPL'; // or <YOUR_LICENSE_KEY>.

const editorConfig = {
        toolbar: {
            items: ['undo', 'redo', '|', 'link', 'insertTable', '|', 'bold', 'italic', '|', 'mediaEmbed', 'insertImageViaUrl'],
        },
        plugins: [AutoLink, Autosave, Bold, Italic, Essentials, Heading, Link, MediaEmbed, Paragraph, Table, TableCellProperties, TableColumnResize, TableProperties, TableToolbar,
            ImageInline, ImageToolbar, ImageBlock, ImageStyle, ImageInsertViaUrl, AutoImage, ImageTextAlternative, ImageResize],
        initialData:
            `    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempus mi urna, non ultricies mi consectetur et. Nam nulla diam, vulputate ut nisi at, hendrerit pharetra lectus. Ut cursus massa id lorem faucibus aliquet. Morbi eget justo lacus. Nulla tempus felis quam, nec aliquet libero bibendum vitae. Sed iaculis auctor dignissim. Proin nec euismod mauris, sed lobortis massa. Donec varius eleifend massa, eget consequat dui luctus at. Curabitur ullamcorper tortor vitae eros fermentum, dignissim dictum lectus accumsan. Fusce elementum odio vulputate, venenatis est eget, tempus magna. Etiam eu orci a mi efficitur egestas. Integer consectetur pharetra arcu nec dictum. Aliquam elementum, orci bibendum viverra congue, urna purus scelerisque leo, non fringilla nisl nibh ac leo. Sed iaculis diam a est fermentum fermentum. Aliquam varius est nec nibh tristique luctus.
                </p>
                <figure class="image">
                    <img style="aspect-ratio:614/1024;" src="https://i.imgur.com/aaN2FK2.jpeg" width="614" height="1024">
                </figure>
                <p>
                    Vestibulum augue orci, dapibus id tempor nec, tempor at magna. Donec ultrices eget turpis a fermentum. Donec sagittis varius felis ac dignissim. Curabitur quis feugiat purus. Nullam a leo ac metus vestibulum aliquam nec ut justo. Nulla faucibus vel felis non porttitor. Ut nec velit nec nibh congue tincidunt et nec diam. In vulputate consectetur ex, et vulputate enim rutrum vel. Pellentesque ac sapien a elit ultrices maximus eu id magna. Cras id purus quis magna convallis rutrum. Vivamus fringilla elit ac justo sodales suscipit. Donec ligula turpis, rutrum vel consectetur sit amet, blandit ut mi.
                </p>
            `,
        licenseKey: LICENSE_KEY,
        link: {
            allowedProtocols: ['https?']
        },
        mediaEmbed: {
            previewsInData: true,
        },
        placeholder: 'Type or paste your content here!',
        table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
        },
        autoGrow: {
            minHeight: 100,
            maxHeight: 350,
        },
        image: {
            toolbar: ['imageTextAlternative', '|', 'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText', 'resizeImage']
        },
    };

async function setupEditor() {
    const editor = await InlineEditor.create(document.querySelector('#editor'), editorConfig),
        editor2 = await InlineEditor.create(document.querySelector('#editor2'), editorConfig);


    editor.model.document.on('change:data', ()=> setTimeout(handleDataChange, 100));

    // expose editor to console
    window.editor = editor;

    function handleDataChange() {
        const dataHtml = editor.getData(),
            editorElement = document.getElementById('editor'),
            editingHtml = editorElement.innerHTML,
            editingOutputText = document.getElementById('editing-output-text'),
            editingOutputRendered = document.getElementById('editing-output-rendered'),
            dataOutputText = document.getElementById('data-output-text'),
            dataOutputRendered = document.getElementById('data-output-rendered');

        if (editingOutputText) {
            editingOutputText.innerText = editingHtml;
        }

        if (editingOutputRendered) {
            editingOutputRendered.innerHTML = editingHtml;
        }

        if (dataOutputText) {
            dataOutputText.innerText = dataHtml;
        }

        if (dataOutputRendered) {
            dataOutputRendered.innerHTML = dataHtml;
        }
    }

    // initalize the editing/data views manually
    handleDataChange();

    const editingViewOutputEl = document.getElementById('editing-view-output'),
        dataViewOutputEl = document.getElementById('data-view-output');

    document.getElementById('toggle-edit-view-button').addEventListener('click', buildToggleHandler(editingViewOutputEl, 'hidden'));
    document.getElementById('toggle-data-view-button').addEventListener('click', buildToggleHandler(dataViewOutputEl, 'hidden'));
}

setupEditor();

