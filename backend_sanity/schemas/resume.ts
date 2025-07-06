export default {
    name: 'resume',
    title: 'Resume',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Button Title',
            type: 'string',
            description: 'Text to display on the resume button'
        },
        {
            name: 'resumeLink',
            title: 'Resume Link',
            type: 'url',
            description: 'Direct link to the resume file (Google Drive, Dropbox, etc.)'
        },
        {
            name: 'isActive',
            title: 'Active',
            type: 'boolean',
            description: 'Toggle to show/hide the resume button',
            initialValue: true
        },
        {
            name: 'downloadText',
            title: 'Download Text',
            type: 'string',
            description: 'Alt text for accessibility',
            initialValue: 'Download Resume'
        }
    ]
} 