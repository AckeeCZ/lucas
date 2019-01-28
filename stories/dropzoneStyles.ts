export const colors = {
    primary: 'rgba(46, 100, 255, 0.1)',
    background: 'rgba(46, 100, 255, 0.1)',
    backgroundBox: '#f8f8fa',
    secondary: 'rgba(46, 100, 255, 0.1)',
    contrast: '#ff639c',
    tertiary: '#06007b',

    failed: '#FFE5E5',
    uploaded: '#DEFFD6',
};

export const styles = {
    dropArea: {
        background: 'rgba(46, 100, 255, 0.1)',
        borderColor: '#2E64FF',
        color: '#2E64FF',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 8,
        height: 'auto',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 500,
        lineHeight: '18px',
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 75,
        paddingTop: 30,
        paddingBottom: 30,
    } as React.CSSProperties,
    dropAreaHover: {
        background: '#FEFFC1',
    }  as React.CSSProperties,
    title: {
        fontSize: 14,
        fontWeight: 500,
        lineHeight: '18px',
        color: 'rgba(46, 100, 255, 0.5)',
        marginBottom: 23,
    }  as React.CSSProperties,
};
