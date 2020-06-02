// Please refer to FilePond for documentation on these functions
// FilePond is also used in layout.ejs

const rootStyles = window.getComputedStyle(document.documentElement) // get styles from root element

if (rootStyles.getPropertyValue('--book-cover-width-large') != null && 
    rootStyles.getPropertyValue('--book-cover-width-large') != '') {
    ready();
} else {
    document.getElementById('main-css').addEventListener('load', ready);
}

function ready() {
    const coverWidth = parseFloat(rootStyles.getPropertyValue('--book-cover-widh-large'));
    const coverAspectRatio = parseFloat(rootStyles.getPropertyValue('--book-cover-aspect-ratio'));
    const coverHeight = parseFloat(coverWidth / coverAspectRatio);

    FilePond.registerPlugin(
        FilePondPluginImagePreview,
        FilePondPluginImageResize,
        FilePondPluginFileEncode
    );

    FilePond.setOptions({
        stylePanelAspectRatio: 1 / coverAspectRatio,
        imageResizeTargetWidth: coverWidth,
        imageResizeTargetHeight: coverHeight
    })
    
    FilePond.parse(document.body);
}