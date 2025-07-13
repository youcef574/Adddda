// ===== GLOBAL VARIABLES =====
let currentLanguage = localStorage.getItem('language') || 'ar';
let formData = {
    mainImage: null,
    galleryImages: [],
    variants: []
};
let validationRules = {};
let progressPercentage = 0;
let autoSaveInterval;
let variantCounter = 0;

// ===== LANGUAGE SYSTEM =====
const translations = {
    ar: {
        // Header & Navigation
        'dashboard': 'لوحة التحكم',
        'settings': 'الإعدادات',
        'logout': 'تسجيل الخروج',
        
        // Page Title
        'add_new_product': 'إضافة منتج جديد',
        'fill_product_info': 'املأ المعلومات أدناه لإضافة منتجك',
        'form_progress': 'تقدم النموذج',
        'progress': 'التقدم',
        
        // Form Sections
        'basic_information': 'المعلومات الأساسية',
        'essential_product_details': 'تفاصيل المنتج الأساسية',
        'product_description': 'وصف المنتج',
        'describe_product_detail': 'اوصف منتجك بالتفصيل',
        'product_images': 'صور المنتج',
        'add_attractive_images': 'أضف صوراً جذابة',
        'product_variants': 'متغيرات المنتج',
        'add_options_color_size': 'أضف خيارات مثل اللون والحجم',
        'additional_options': 'خيارات إضافية',
        'advanced_product_settings': 'إعدادات المنتج المتقدمة',
        
        // Form Fields
        'product_name': 'اسم المنتج',
        'price_dzd': 'السعر (دج)',
        'quantity_optional': 'الكمية (اختياري)',
        'short_description': 'وصف مختصر',
        'detailed_description': 'وصف مفصل',
        'main_image': 'الصورة الرئيسية',
        'image_gallery': 'معرض الصور',
        'variant_name': 'اسم المتغير',
        'variant_value': 'قيمة المتغير',
        'store_visibility': 'الظهور في المتجر',
        'visible': 'مرئي',
        'hidden': 'مخفي',
        
        // WYSIWYG Editor Text Types
        'text_format': 'نوع النص',
        'normal_text': 'نص عادي',
        'heading_1': 'عنوان رئيسي (H1)',
        'heading_2': 'عنوان فرعي (H2)',
        'heading_3': 'عنوان ثانوي (H3)',
        'heading_4': 'عنوان صغير (H4)',
        'heading_5': 'عنوان أصغر (H5)',
        'heading_6': 'عنوان دقيق (H6)',
        'paragraph': 'فقرة',
        'quote': 'اقتباس',
        'preformatted': 'نص مُنسق مسبقاً',
        'code_block': 'كتلة كود',
        'address': 'عنوان',
        
        // Font Options
        'font_size': 'حجم الخط',
        'size_tiny': 'صغير جداً (8px)',
        'size_small': 'صغير (10px)',
        'size_normal': 'عادي (13px)',
        'size_medium': 'متوسط (16px)',
        'size_large': 'كبير (18px)',
        'size_xlarge': 'كبير جداً (24px)',
        'size_huge': 'ضخم (36px)',
        
        'font_family': 'نوع الخط',
        'font_arial': 'Arial',
        'font_helvetica': 'Helvetica',
        'font_times': 'Times New Roman',
        'font_georgia': 'Georgia',
        'font_verdana': 'Verdana',
        'font_courier': 'Courier New',
        'font_impact': 'Impact',
        'font_comic': 'Comic Sans MS',
        'font_tahoma': 'Tahoma',
        'font_trebuchet': 'Trebuchet MS',
        
        // Buttons
        'save_product': 'حفظ المنتج',
        'reset': 'إعادة تعيين',
        'preview': 'معاينة',
        'save_as_draft': 'حفظ كمسودة',
        'add_variant': 'إضافة متغير',
        'add_value': 'إضافة',
        'remove': 'حذف',
        'ok': 'موافق',
        'cancel': 'إلغاء',
        
        // Dropzone
        'drop_main_image_here': 'اسحب صورتك الرئيسية هنا',
        'or_click_to_select': 'أو انقر للاختيار',
        'png_jpg_webp_5mb': 'PNG, JPG, WEBP حتى 5MB',
        'add_additional_images': 'أضف صوراً إضافية',
        'up_to_5_images': 'حتى 5 صور',
        'png_jpg_webp_5mb_each': 'PNG, JPG, WEBP حتى 5MB لكل صورة',
        
        // Variants
        'variant': 'متغير',
        'enter_variant_name': 'أدخل اسم المتغير (مثل: اللون، الحجم)',
        'enter_variant_value': 'أدخل قيمة واضغط Enter',
        
        // Validation Messages
        'field_required': 'هذا الحقل مطلوب',
        'min_length': 'الحد الأدنى {min} أحرف مطلوب',
        'max_length': 'الحد الأقصى {max} حرف مسموح',
        'invalid_price': 'يرجى إدخال سعر صحيح',
        'invalid_quantity': 'يرجى إدخال كمية صحيحة',
        'invalid_file_format': 'تنسيق الملف غير مدعوم',
        'file_too_large': 'الملف كبير جداً (الحد الأقصى {size}MB)',
        'max_images_reached': 'الحد الأقصى {max} صور مسموح',
        'duplicate_value': 'هذه القيمة موجودة بالفعل',
        'max_values_reached': 'الحد الأقصى {max} قيم مسموح',
        'variant_name_required': 'اسم المتغير مطلوب',
        'variant_values_required': 'قيمة واحدة على الأقل مطلوبة',
        
        // Success Messages
        'product_saved': 'تم حفظ المنتج بنجاح',
        'draft_saved': 'تم حفظ المسودة',
        'form_reset': 'تم إعادة تعيين النموذج',
        'variant_added': 'تم إضافة المتغير',
        'variant_removed': 'تم حذف المتغير',
        'value_added': 'تم إضافة القيمة',
        'value_removed': 'تم حذف القيمة',
        'auto_save_restored': 'تم استعادة البيانات المحفوظة تلقائياً',
        
        // Error Messages
        'save_error': 'خطأ في حفظ المنتج',
        'network_error': 'خطأ في الشبكة',
        'validation_error': 'يرجى إصلاح الأخطاء في النموذج',
        'load_error': 'خطأ في تحميل البيانات',
        
        // Modal
        'success': 'نجح',
        'error': 'خطأ',
        'warning': 'تحذير',
        'confirm': 'تأكيد',
        'info': 'معلومات',
        
        // Loading
        'saving': 'جاري الحفظ...',
        'loading': 'جاري التحميل...',
        'processing': 'جاري المعالجة...',
        
        // Other
        'confirm_action': 'هل أنت متأكد من تنفيذ هذا الإجراء؟',
        'unsaved_changes': 'لديك تغييرات غير محفوظة. هل تريد المغادرة حقاً؟'
    },
    en: {
        // Header & Navigation
        'dashboard': 'Dashboard',
        'settings': 'Settings',
        'logout': 'Logout',
        
        // Page Title
        'add_new_product': 'Add New Product',
        'fill_product_info': 'Fill in the information below to add your product',
        'form_progress': 'Form Progress',
        'progress': 'Progress',
        
        // Form Sections
        'basic_information': 'Basic Information',
        'essential_product_details': 'Essential product details',
        'product_description': 'Product Description',
        'describe_product_detail': 'Describe your product in detail',
        'product_images': 'Product Images',
        'add_attractive_images': 'Add attractive images',
        'product_variants': 'Product Variants',
        'add_options_color_size': 'Add options like color, size, etc.',
        'additional_options': 'Additional Options',
        'advanced_product_settings': 'Advanced product settings',
        
        // Form Fields
        'product_name': 'Product Name',
        'price_dzd': 'Price (DZD)',
        'quantity_optional': 'Quantity (optional)',
        'short_description': 'Short Description',
        'detailed_description': 'Detailed Description',
        'main_image': 'Main Image',
        'image_gallery': 'Image Gallery',
        'variant_name': 'Variant Name',
        'variant_value': 'Variant Value',
        'store_visibility': 'Store Visibility',
        'visible': 'Visible',
        'hidden': 'Hidden',
        
        // WYSIWYG Editor Text Types
        'text_format': 'Text Format',
        'normal_text': 'Normal Text',
        'heading_1': 'Main Heading (H1)',
        'heading_2': 'Sub Heading (H2)',
        'heading_3': 'Secondary Heading (H3)',
        'heading_4': 'Small Heading (H4)',
        'heading_5': 'Smaller Heading (H5)',
        'heading_6': 'Tiny Heading (H6)',
        'paragraph': 'Paragraph',
        'quote': 'Quote',
        'preformatted': 'Preformatted Text',
        'code_block': 'Code Block',
        'address': 'Address',
        
        // Font Options
        'font_size': 'Font Size',
        'size_tiny': 'Tiny (8px)',
        'size_small': 'Small (10px)',
        'size_normal': 'Normal (13px)',
        'size_medium': 'Medium (16px)',
        'size_large': 'Large (18px)',
        'size_xlarge': 'Extra Large (24px)',
        'size_huge': 'Huge (36px)',
        
        'font_family': 'Font Family',
        'font_arial': 'Arial',
        'font_helvetica': 'Helvetica',
        'font_times': 'Times New Roman',
        'font_georgia': 'Georgia',
        'font_verdana': 'Verdana',
        'font_courier': 'Courier New',
        'font_impact': 'Impact',
        'font_comic': 'Comic Sans MS',
        'font_tahoma': 'Tahoma',
        'font_trebuchet': 'Trebuchet MS',
        
        // Buttons
        'save_product': 'Save Product',
        'reset': 'Reset',
        'preview': 'Preview',
        'save_as_draft': 'Save as Draft',
        'add_variant': 'Add Variant',
        'add_value': 'Add',
        'remove': 'Remove',
        'ok': 'OK',
        'cancel': 'Cancel',
        
        // Dropzone
        'drop_main_image_here': 'Drop your main image here',
        'or_click_to_select': 'or click to select',
        'png_jpg_webp_5mb': 'PNG, JPG, WEBP up to 5MB',
        'add_additional_images': 'Add additional images',
        'up_to_5_images': 'Up to 5 images',
        'png_jpg_webp_5mb_each': 'PNG, JPG, WEBP up to 5MB each',
        
        // Variants
        'variant': 'Variant',
        'enter_variant_name': 'Enter variant name (e.g. Color, Size)',
        'enter_variant_value': 'Enter a value and press Enter',
        
        // Validation Messages
        'field_required': 'This field is required',
        'min_length': 'Minimum {min} characters required',
        'max_length': 'Maximum {max} characters allowed',
        'invalid_price': 'Please enter a valid price',
        'invalid_quantity': 'Please enter a valid quantity',
        'invalid_file_format': 'Unsupported file format',
        'file_too_large': 'File too large (max {size}MB)',
        'max_images_reached': 'Maximum {max} images allowed',
        'duplicate_value': 'This value already exists',
        'max_values_reached': 'Maximum {max} values allowed',
        'variant_name_required': 'Variant name is required',
        'variant_values_required': 'At least one value is required',
        
        // Success Messages
        'product_saved': 'Product saved successfully',
        'draft_saved': 'Draft saved',
        'form_reset': 'Form reset',
        'variant_added': 'Variant added',
        'variant_removed': 'Variant removed',
        'value_added': 'Value added',
        'value_removed': 'Value removed',
        'auto_save_restored': 'Auto-saved data restored',
        
        // Error Messages
        'save_error': 'Error saving product',
        'network_error': 'Network error',
        'validation_error': 'Please fix errors in the form',
        'load_error': 'Error loading data',
        
        // Modal
        'success': 'Success',
        'error': 'Error',
        'warning': 'Warning',
        'confirm': 'Confirmation',
        'info': 'Information',
        
        // Loading
        'saving': 'Saving...',
        'loading': 'Loading...',
        'processing': 'Processing...',
        
        // Other
        'confirm_action': 'Are you sure you want to perform this action?',
        'unsaved_changes': 'You have unsaved changes. Do you really want to leave?'
    }
};

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function generateId() {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

// ===== LANGUAGE FUNCTIONS =====
function translate(key, params = {}) {
    let text = translations[currentLanguage][key] || key;
    
    // Replace parameters in text
    Object.keys(params).forEach(param => {
        text = text.replace(`{${param}}`, params[param]);
    });
    
    return text;
}

function updateLanguage() {
    // Update all elements with data-key attributes
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        const text = translate(key);
        
        if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'number')) {
            element.placeholder = text;
        } else if (element.tagName === 'OPTION') {
            element.textContent = text;
        } else {
            element.textContent = text;
        }
    });
    
    // Update language toggle button
    const langText = document.getElementById('langText');
    if (langText) {
        langText.textContent = currentLanguage === 'ar' ? 'العربية' : 'English';
    }
    
    // Update HTML direction
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
    
    // Update progress text
    updateProgressText();
    
    // Save language preference
    localStorage.setItem('language', currentLanguage);
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    updateLanguage();
}

// ===== VALIDATION SYSTEM =====
function initValidationRules() {
    validationRules = {
        productName: {
            required: true,
            minLength: 3,
            maxLength: 100
        },
        productPrice: {
            required: true,
            type: 'number',
            min: 0
        },
        productQuantity: {
            type: 'number',
            min: 0
        },
        shortDescription: {
            required: true,
            minLength: 10,
            maxLength: 200
        },
        detailedDescription: {
            required: true,
            minLength: 30,
            maxLength: 2000
        }
    };
}

function validateField(fieldName, value, showError = true) {
    const rules = validationRules[fieldName];
    if (!rules) return true;
    
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + 'Error');
    
    // Clear previous validation state
    if (field) {
        field.classList.remove('valid', 'invalid');
    }
    if (errorElement) {
        errorElement.classList.remove('show');
        errorElement.textContent = '';
    }
    
    // Required validation
    if (rules.required && (!value || value.toString().trim() === '')) {
        if (showError) {
            showFieldError(fieldName, translate('field_required'));
        }
        return false;
    }
    
    // Skip other validations if field is empty and not required
    if (!value || value.toString().trim() === '') {
        if (field) field.classList.add('valid');
        return true;
    }
    
    // Type validation
    if (rules.type === 'number') {
        const numValue = parseFloat(value);
        if (isNaN(numValue)) {
            if (showError) {
                showFieldError(fieldName, fieldName.includes('price') ? translate('invalid_price') : translate('invalid_quantity'));
            }
            return false;
        }
        
        // Min value validation
        if (rules.min !== undefined && numValue < rules.min) {
            if (showError) {
                showFieldError(fieldName, fieldName.includes('price') ? translate('invalid_price') : translate('invalid_quantity'));
            }
            return false;
        }
    }
    
    // Length validation
    if (rules.minLength && value.length < rules.minLength) {
        if (showError) {
            showFieldError(fieldName, translate('min_length', { min: rules.minLength }));
        }
        return false;
    }
    
    if (rules.maxLength && value.length > rules.maxLength) {
        if (showError) {
            showFieldError(fieldName, translate('max_length', { max: rules.maxLength }));
        }
        return false;
    }
    
    // Field is valid
    if (field) {
        field.classList.add('valid');
    }
    
    return true;
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + 'Error');
    
    if (field) {
        field.classList.add('invalid');
        field.classList.remove('valid');
    }
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function validateForm() {
    let isValid = true;
    
    // Validate basic fields
    Object.keys(validationRules).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        let value = '';
        
        if (fieldName === 'detailedDescription') {
            // Get content from WYSIWYG editor
            value = field ? field.textContent.trim() : '';
        } else {
            value = field ? field.value : '';
        }
        
        if (!validateField(fieldName, value, true)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// ===== PROGRESS BAR =====
function calculateProgress() {
    const fields = [
        { id: 'productName', weight: 20 },
        { id: 'productPrice', weight: 20 },
        { id: 'productQuantity', weight: 5 },
        { id: 'shortDescription', weight: 15 },
        { id: 'detailedDescription', weight: 20, isWysiwyg: true },
        { id: 'mainImage', weight: 15, isFile: true },
        { id: 'variants', weight: 5, isVariants: true }
    ];
    
    let totalProgress = 0;
    
    fields.forEach(field => {
        let isCompleted = false;
        
        if (field.isFile) {
            isCompleted = formData.mainImage !== null;
        } else if (field.isVariants) {
            isCompleted = formData.variants.length > 0;
        } else if (field.isWysiwyg) {
            const element = document.getElementById(field.id);
            if (element) {
                const value = element.textContent.trim();
                isCompleted = value.length > 0;
            }
        } else {
            const element = document.getElementById(field.id);
            if (element) {
                const value = element.value.trim();
                isCompleted = value.length > 0;
            }
        }
        
        if (isCompleted) {
            totalProgress += field.weight;
        }
    });
    
    progressPercentage = Math.min(totalProgress, 100);
    updateProgressBar();
}

function updateProgressBar() {
    const progressFill = document.getElementById('progressFill');
    const progressPercentageEl = document.getElementById('progressPercentage');
    
    if (progressFill) {
        progressFill.style.width = progressPercentage + '%';
    }
    
    if (progressPercentageEl) {
        progressPercentageEl.textContent = Math.round(progressPercentage) + '%';
    }
    
    updateProgressText();
}

function updateProgressText() {
    const progressText = document.getElementById('progressText');
    if (progressText) {
        progressText.textContent = translate('progress') + ': ' + Math.round(progressPercentage) + '%';
    }
}

// ===== WYSIWYG EDITOR =====
function initWysiwygEditor() {
    const editor = document.getElementById('detailedDescription');
    const toolbar = document.getElementById('wysiwygToolbar');
    
    if (!editor || !toolbar) return;
    
    let isSourceMode = false;
    let isFullscreen = false;
    let originalContent = '';
    
    // Initialize toolbar buttons
    toolbar.addEventListener('click', (e) => {
        const button = e.target.closest('.toolbar-btn');
        if (button) {
            e.preventDefault();
            const command = button.getAttribute('data-command');
            executeCommand(command, button);
        }
    });
    
    // Handle select changes
    toolbar.addEventListener('change', (e) => {
        if (e.target.classList.contains('toolbar-select')) {
            const command = e.target.getAttribute('data-command');
            const value = e.target.value;
            if (value) {
                executeCommand(command, null, value);
            }
        }
    });
    
    // Handle color input changes
    toolbar.addEventListener('input', (e) => {
        if (e.target.classList.contains('toolbar-color')) {
            const command = e.target.getAttribute('data-command');
            const value = e.target.value;
            executeCommand(command, null, value);
        }
    });
    
    // Editor event listeners
    editor.addEventListener('input', () => {
        updateToolbarState();
        calculateProgress();
        autoSaveForm();
    });
    
    editor.addEventListener('keyup', updateToolbarState);
    editor.addEventListener('mouseup', updateToolbarState);
    
    // Prevent default behavior for some keys
    editor.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            document.execCommand('insertText', false, '    ');
        }
        
        // Keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch (e.key.toLowerCase()) {
                case 'b':
                    e.preventDefault();
                    executeCommand('bold');
                    break;
                case 'i':
                    e.preventDefault();
                    executeCommand('italic');
                    break;
                case 'u':
                    e.preventDefault();
                    executeCommand('underline');
                    break;
                case 'z':
                    if (e.shiftKey) {
                        e.preventDefault();
                        executeCommand('redo');
                    } else {
                        e.preventDefault();
                        executeCommand('undo');
                    }
                    break;
                case 'a':
                    e.preventDefault();
                    executeCommand('selectAll');
                    break;
            }
        }
        
        // ESC key to exit fullscreen
        if (e.key === 'Escape' && isFullscreen) {
            executeCommand('fullscreen');
        }
    });
}

function executeCommand(command, button, value = null) {
    const editor = document.getElementById('detailedDescription');
    const container = document.querySelector('.wysiwyg-container');
    
    editor.focus();
    
    switch (command) {
        case 'createLink':
            const url = prompt('أدخل الرابط:');
            if (url) {
                document.execCommand(command, false, url);
            }
            break;
        case 'insertImage':
            const imageUrl = prompt('أدخل رابط الصورة:');
            if (imageUrl) {
                document.execCommand(command, false, imageUrl);
            }
            break;
        case 'insertTable':
            const rows = prompt('عدد الصفوف:', '3');
            const cols = prompt('عدد الأعمدة:', '3');
            if (rows && cols) {
                insertTable(parseInt(rows), parseInt(cols));
            }
            break;
        case 'insertParagraph':
            document.execCommand('formatBlock', false, 'p');
            break;
        case 'insertLineBreak':
            document.execCommand('insertHTML', false, '<br>');
            break;
        case 'insertText':
            const text = prompt('أدخل النص:');
            if (text) {
                document.execCommand('insertText', false, text);
            }
            break;
        case 'insertHTML':
            const html = prompt('أدخل كود HTML:');
            if (html) {
                document.execCommand('insertHTML', false, html);
            }
            break;
        case 'insertVideo':
            const videoUrl = prompt('أدخل رابط الفيديو (YouTube, Vimeo):');
            if (videoUrl) {
                insertVideo(videoUrl);
            }
            break;
        case 'insertEmoji':
            showEmojiPicker();
            break;
        case 'insertQuote':
            const quoteText = prompt('أدخل النص المراد اقتباسه:');
            if (quoteText) {
                document.execCommand('formatBlock', false, 'blockquote');
                document.execCommand('insertText', false, quoteText);
            }
            break;
        case 'copy':
            document.execCommand('copy');
            showToast('success', translate('success'), 'تم النسخ');
            break;
        case 'cut':
            document.execCommand('cut');
            showToast('success', translate('success'), 'تم القص');
            break;
        case 'paste':
            document.execCommand('paste');
            showToast('success', translate('success'), 'تم اللصق');
            break;
        case 'print':
            printEditorContent();
            break;
        case 'help':
            showEditorHelp();
            break;
        case 'viewSource':
            toggleSourceMode();
            break;
        case 'fullscreen':
            toggleFullscreen();
            break;
        case 'formatBlock':
        case 'fontName':
            document.execCommand(command, false, value);
            break;
        case 'fontSize':
            document.execCommand(command, false, value);
            break;
        case 'foreColor':
        case 'backColor':
            document.execCommand(command, false, value);
            break;
        default:
            document.execCommand(command, false, value);
    }
    
    updateToolbarState();
    calculateProgress();
    autoSaveForm();
}

function insertVideo(url) {
    let embedCode = '';
    
    // YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const videoId = extractYouTubeId(url);
        if (videoId) {
            embedCode = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
        }
    }
    // Vimeo
    else if (url.includes('vimeo.com')) {
        const videoId = extractVimeoId(url);
        if (videoId) {
            embedCode = `<iframe src="https://player.vimeo.com/video/${videoId}" width="560" height="315" frameborder="0" allowfullscreen></iframe>`;
        }
    }
    // Direct video URL
    else if (url.match(/\.(mp4|webm|ogg)$/i)) {
        embedCode = `<video controls width="560" height="315"><source src="${url}" type="video/${url.split('.').pop()}">Your browser does not support the video tag.</video>`;
    }
    
    if (embedCode) {
        document.execCommand('insertHTML', false, `<div class="video-container">${embedCode}</div>`);
    } else {
        showToast('error', translate('error'), 'رابط الفيديو غير صحيح');
    }
}

function extractYouTubeId(url) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function extractVimeoId(url) {
    const regex = /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
    const match = url.match(regex);
    return match ? match[3] : null;
}

function showEmojiPicker() {
    const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕'];
    
    const emojiHtml = emojis.map(emoji => `<button type="button" class="emoji-btn" onclick="insertEmoji('${emoji}')">${emoji}</button>`).join('');
    
    showModal('info', 'اختر رمز تعبيري', `<div class="emoji-picker">${emojiHtml}</div>`);
}

function insertEmoji(emoji) {
    document.execCommand('insertText', false, emoji);
    document.querySelector('.modal-overlay').classList.remove('show');
}

function printEditorContent() {
    const editor = document.getElementById('detailedDescription');
    const content = editor.innerHTML;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>طباعة المحتوى</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; }
                h1, h2, h3, h4, h5, h6 { color: #333; margin-top: 20px; }
                blockquote { border-left: 4px solid #ccc; margin: 20px 0; padding: 10px 20px; background: #f9f9f9; }
                table { border-collapse: collapse; width: 100%; margin: 20px 0; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: right; }
                th { background-color: #f2f2f2; }
                img { max-width: 100%; height: auto; }
                pre { background: #f4f4f4; padding: 10px; border-radius: 4px; overflow-x: auto; }
                code { background: #f4f4f4; padding: 2px 4px; border-radius: 2px; }
            </style>
        </head>
        <body>
            ${content}
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

function showEditorHelp() {
    const helpContent = `
        <div class="editor-help">
            <h3>اختصارات لوحة المفاتيح:</h3>
            <ul>
                <li><strong>Ctrl+B</strong>: نص عريض</li>
                <li><strong>Ctrl+I</strong>: نص مائل</li>
                <li><strong>Ctrl+U</strong>: نص مسطر</li>
                <li><strong>Ctrl+Z</strong>: تراجع</li>
                <li><strong>Ctrl+Shift+Z</strong>: إعادة</li>
                <li><strong>Ctrl+A</strong>: تحديد الكل</li>
                <li><strong>Tab</strong>: إدراج مسافات</li>
                <li><strong>Esc</strong>: الخروج من ملء الشاشة</li>
            </ul>
            <h3>نصائح:</h3>
            <ul>
                <li>استخدم العناوين لتنظيم المحتوى</li>
                <li>أضف الصور لجعل المحتوى أكثر جاذبية</li>
                <li>استخدم القوائم لتنظيم المعلومات</li>
                <li>اختر الألوان بعناية للحصول على مظهر احترافي</li>
            </ul>
        </div>
    `;
    
    showModal('info', 'مساعدة المحرر', helpContent);
}

function insertTable(rows, cols) {
    const editor = document.getElementById('detailedDescription');
    let tableHTML = '<table><tbody>';
    
    for (let i = 0; i < rows; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < cols; j++) {
            if (i === 0) {
                tableHTML += '<th>عنوان ' + (j + 1) + '</th>';
            } else {
                tableHTML += '<td>خلية ' + i + ',' + (j + 1) + '</td>';
            }
        }
        tableHTML += '</tr>';
    }
    
    tableHTML += '</tbody></table>';
    
    document.execCommand('insertHTML', false, tableHTML);
}

function toggleSourceMode() {
    const editor = document.getElementById('detailedDescription');
    const button = document.querySelector('[data-command="viewSource"]');
    
    if (!editor.classList.contains('source-mode')) {
        // Switch to source mode
        originalContent = editor.innerHTML;
        editor.textContent = originalContent;
        editor.classList.add('source-mode');
        button.classList.add('active');
    } else {
        // Switch back to visual mode
        const sourceContent = editor.textContent;
        editor.innerHTML = sourceContent;
        editor.classList.remove('source-mode');
        button.classList.remove('active');
    }
}

function toggleFullscreen() {
    const editor = document.getElementById('detailedDescription');
    const container = document.querySelector('.wysiwyg-container');
    const button = document.querySelector('[data-command="fullscreen"]');
    const icon = button.querySelector('i');
    
    if (!container.classList.contains('fullscreen')) {
        // Enter fullscreen
        container.classList.add('fullscreen');
        editor.classList.add('fullscreen');
        button.classList.add('active');
        icon.className = 'fas fa-compress';
        document.body.style.overflow = 'hidden';
    } else {
        // Exit fullscreen
        container.classList.remove('fullscreen');
        editor.classList.remove('fullscreen');
        button.classList.remove('active');
        icon.className = 'fas fa-expand';
        document.body.style.overflow = '';
    }
}

function updateToolbarState() {
    const toolbar = document.getElementById('wysiwygToolbar');
    if (!toolbar) return;
    
    const buttons = toolbar.querySelectorAll('.toolbar-btn');
    buttons.forEach(button => {
        const command = button.getAttribute('data-command');
        if (command && document.queryCommandState(command)) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// ===== DROPZONE SETUP =====
function initDropzones() {
    const mainImageDropzone = document.getElementById('mainImageDropzone');
    const galleryDropzone = document.getElementById('imageGalleryDropzone');
    const mainImageInput = document.getElementById('mainImage');
    const galleryInput = document.getElementById('imageGallery');
    
    if (mainImageDropzone && mainImageInput) {
        setupDropzone(mainImageDropzone, mainImageInput, false);
    }
    
    if (galleryDropzone && galleryInput) {
        setupDropzone(galleryDropzone, galleryInput, true);
    }
}

function setupDropzone(dropzone, input, isMultiple) {
    // Click to select
    dropzone.addEventListener('click', () => {
        input.click();
    });
    
    // Drag and drop
    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
    });
    
    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('dragover');
    });
    
    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        
        const files = Array.from(e.dataTransfer.files);
        handleFileSelection(files, isMultiple);
    });
    
    // File input change
    input.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        handleFileSelection(files, isMultiple);
    });
}

function handleFileSelection(files, isMultiple) {
    if (!isMultiple && files.length > 0) {
        // Main image
        const file = files[0];
        if (validateFile(file)) {
            formData.mainImage = file;
            displayImagePreview(file, 'mainImagePreview', false);
            calculateProgress();
            autoSaveForm();
        }
    } else if (isMultiple) {
        // Gallery images
        const validFiles = files.filter(validateFile);
        if (validFiles.length > 0) {
            formData.galleryImages = [...formData.galleryImages, ...validFiles].slice(0, 5);
            displayImagePreview(formData.galleryImages, 'imageGalleryPreview', true);
            calculateProgress();
            autoSaveForm();
        }
    }
}

function validateFile(file) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!allowedTypes.includes(file.type)) {
        showToast('error', translate('error'), translate('invalid_file_format'));
        return false;
    }
    
    if (file.size > maxSize) {
        showToast('error', translate('error'), translate('file_too_large', { size: 5 }));
        return false;
    }
    
    return true;
}

function displayImagePreview(files, containerId, isMultiple) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    if (isMultiple && Array.isArray(files)) {
        files.forEach((file, index) => {
            createImagePreviewItem(file, container, index, isMultiple);
        });
    } else if (!isMultiple && files) {
        createImagePreviewItem(files, container, 0, isMultiple);
    }
}

function createImagePreviewItem(file, container, index, isMultiple) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const previewItem = document.createElement('div');
        previewItem.className = 'image-preview-item';
        
        previewItem.innerHTML = `
            <img src="${e.target.result}" alt="Preview">
            <button type="button" class="image-preview-remove" onclick="${isMultiple ? `removeGalleryImage(${index})` : 'removeMainImage()'}">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        container.appendChild(previewItem);
    };
    reader.readAsDataURL(file);
}

function removeMainImage() {
    formData.mainImage = null;
    const container = document.getElementById('mainImagePreview');
    if (container) {
        container.innerHTML = '';
    }
    calculateProgress();
    autoSaveForm();
}

function removeGalleryImage(index) {
    formData.galleryImages.splice(index, 1);
    displayImagePreview(formData.galleryImages, 'imageGalleryPreview', true);
    calculateProgress();
    autoSaveForm();
}

// ===== VARIANT MANAGEMENT =====
function initVariantSystem() {
    const addVariantBtn = document.getElementById('addVariantBtn');
    if (addVariantBtn) {
        addVariantBtn.addEventListener('click', addVariant);
    }
}

function addVariant() {
    variantCounter++;
    const variantId = 'variant_' + generateId();
    
    const variant = {
        id: variantId,
        name: '',
        values: []
    };
    
    formData.variants.push(variant);
    
    const variantHTML = createVariantHTML(variantId, variantCounter);
    document.getElementById('variantsContainer').insertAdjacentHTML('beforeend', variantHTML);
    
    showToast('success', translate('success'), translate('variant_added'));
}

function createVariantHTML(variantId, counter) {
    return `
        <div class="variant-item" data-variant-id="${variantId}">
            <div class="variant-header">
                <h4 class="variant-title">${translate('variant')} ${counter}</h4>
                <button type="button" class="variant-remove" onclick="removeVariant('${variantId}')">
                    <i class="fas fa-trash"></i>
                    <span>${translate('remove')}</span>
                </button>
            </div>
            <div class="variant-content">
                <div class="form-field variant-name-input">
                    <label for="${variantId}_name">${translate('variant_name')}</label>
                    <div class="input-container">
                        <input type="text" 
                               id="${variantId}_name" 
                               placeholder="${translate('enter_variant_name')}"
                               onchange="updateVariantName('${variantId}', this.value)">
                        <div class="input-icon">
                            <i class="fas fa-tag"></i>
                        </div>
                    </div>
                </div>
                <div class="form-field variant-values">
                    <label>${translate('variant_value')}</label>
                    <div class="values-input-container">
                        <input type="text" 
                               id="${variantId}_value_input" 
                               placeholder="${translate('enter_variant_value')}"
                               onkeypress="handleVariantValueKeyPress(event, '${variantId}')">
                        <button type="button" class="add-value-btn" onclick="addVariantValue('${variantId}')">
                            <i class="fas fa-plus"></i>
                            <span>${translate('add_value')}</span>
                        </button>
                    </div>
                    <div class="tags-display" id="${variantId}_tags"></div>
                </div>
            </div>
        </div>
    `;
}

function removeVariant(variantId) {
    if (confirm(translate('confirm_action'))) {
        const variantElement = document.querySelector(`[data-variant-id="${variantId}"]`);
        if (variantElement) {
            variantElement.remove();
        }
        
        formData.variants = formData.variants.filter(v => v.id !== variantId);
        calculateProgress();
        autoSaveForm();
        showToast('success', translate('success'), translate('variant_removed'));
    }
}

function updateVariantName(variantId, name) {
    const variant = formData.variants.find(v => v.id === variantId);
    if (variant) {
        variant.name = name.trim();
        updateVariantStatus(variantId);
        autoSaveForm();
    }
}

function handleVariantValueKeyPress(event, variantId) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addVariantValue(variantId);
    }
}

function addVariantValue(variantId) {
    const input = document.getElementById(`${variantId}_value_input`);
    if (!input) return;
    
    const value = input.value.trim();
    if (!value) {
        showToast('warning', translate('warning'), translate('field_required'));
        return;
    }
    
    const variant = formData.variants.find(v => v.id === variantId);
    if (!variant) return;
    
    // Check for duplicates
    if (variant.values.includes(value)) {
        showToast('warning', translate('warning'), translate('duplicate_value'));
        return;
    }
    
    // Check max values limit
    if (variant.values.length >= 20) {
        showToast('warning', translate('warning'), translate('max_values_reached', { max: 20 }));
        return;
    }
    
    variant.values.push(value);
    input.value = '';
    
    renderVariantTags(variantId);
    updateVariantStatus(variantId);
    calculateProgress();
    autoSaveForm();
    showToast('success', translate('success'), translate('value_added'));
}

function removeVariantValue(variantId, value) {
    const variant = formData.variants.find(v => v.id === variantId);
    if (variant) {
        const index = variant.values.indexOf(value);
        if (index > -1) {
            variant.values.splice(index, 1);
            renderVariantTags(variantId);
            updateVariantStatus(variantId);
            calculateProgress();
            autoSaveForm();
            showToast('success', translate('success'), translate('value_removed'));
        }
    }
}

function renderVariantTags(variantId) {
    const tagsContainer = document.getElementById(`${variantId}_tags`);
    const variant = formData.variants.find(v => v.id === variantId);
    
    if (!tagsContainer || !variant) return;
    
    tagsContainer.innerHTML = '';
    
    if (variant.values.length > 0) {
        tagsContainer.classList.add('has-tags');
    } else {
        tagsContainer.classList.remove('has-tags');
    }
    
    variant.values.forEach(value => {
        const tag = document.createElement('div');
        tag.className = 'tag';
        tag.innerHTML = `
            <span>${value}</span>
            <button type="button" class="tag-remove" onclick="removeVariantValue('${variantId}', '${value}')">
                <i class="fas fa-times"></i>
            </button>
        `;
        tagsContainer.appendChild(tag);
    });
}

function updateVariantStatus(variantId) {
    const variantElement = document.querySelector(`[data-variant-id="${variantId}"]`);
    const variant = formData.variants.find(v => v.id === variantId);
    
    if (!variantElement || !variant) return;
    
    const hasName = variant.name.length > 0;
    const hasValues = variant.values.length > 0;
    
    if (hasName || hasValues) {
        variantElement.classList.add('active');
    } else {
        variantElement.classList.remove('active');
    }
}

// ===== FORM HANDLING =====
function initFormHandling() {
    const form = document.getElementById('productForm');
    const resetBtn = document.getElementById('resetBtn');
    const previewBtn = document.getElementById('previewBtn');
    const draftBtn = document.getElementById('draftBtn');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', handleFormReset);
    }
    
    if (previewBtn) {
        previewBtn.addEventListener('click', handlePreview);
    }
    
    if (draftBtn) {
        draftBtn.addEventListener('click', handleSaveDraft);
    }
    
    // Add input event listeners for real-time validation
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        if (input.type !== 'file' && input.type !== 'radio' && input.type !== 'checkbox') {
            input.addEventListener('input', debounce((e) => {
                validateField(e.target.id || e.target.name, e.target.value);
                calculateProgress();
                autoSaveForm();
            }, 300));
            
            input.addEventListener('blur', (e) => {
                validateField(e.target.id || e.target.name, e.target.value, true);
            });
        }
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        showToast('error', translate('error'), translate('validation_error'));
        return;
    }
    
    showLoadingOverlay(true);
    const submitBtn = e.target.querySelector('button[type="submit"]');
    setButtonLoading(submitBtn, true);
    
    // Simulate form submission
    setTimeout(() => {
        setButtonLoading(submitBtn, false);
        showLoadingOverlay(false);
        showModal('success', translate('success'), translate('product_saved'));
        clearAutoSave();
    }, 2000);
}

function handleFormReset() {
    if (confirm(translate('confirm_action'))) {
        // Reset form
        document.getElementById('productForm').reset();
        
        // Reset WYSIWYG editor
        const editor = document.getElementById('detailedDescription');
        if (editor) {
            editor.innerHTML = '';
        }
        
        // Reset variants
        document.getElementById('variantsContainer').innerHTML = '';
        variantCounter = 0;
        
        // Reset form data
        formData = {
            mainImage: null,
            galleryImages: [],
            variants: []
        };
        
        // Reset validation states
        document.querySelectorAll('.valid, .invalid').forEach(el => {
            el.classList.remove('valid', 'invalid');
        });
        
        document.querySelectorAll('.error-message.show').forEach(el => {
            el.classList.remove('show');
        });
        
        // Reset progress
        progressPercentage = 0;
        updateProgressBar();
        
        // Reset image previews
        document.getElementById('mainImagePreview').innerHTML = '';
        document.getElementById('imageGalleryPreview').innerHTML = '';
        
        // Clear auto-save
        clearAutoSave();
        
        showToast('success', translate('success'), translate('form_reset'));
    }
}

function handlePreview() {
    const previewData = collectFormData();
    console.log('Preview data:', previewData);
    showToast('info', translate('info'), 'Preview functionality would open here');
}

function handleSaveDraft() {
    const draftBtn = document.getElementById('draftBtn');
    setButtonLoading(draftBtn, true);
    
    const draftData = collectFormData();
    localStorage.setItem('productDraft', JSON.stringify(draftData));
    
    setTimeout(() => {
        setButtonLoading(draftBtn, false);
        showToast('success', translate('success'), translate('draft_saved'));
    }, 1000);
}

function collectFormData() {
    const editor = document.getElementById('detailedDescription');
    const data = {
        productName: document.getElementById('productName')?.value || '',
        productPrice: document.getElementById('productPrice')?.value || '',
        productQuantity: document.getElementById('productQuantity')?.value || '',
        shortDescription: document.getElementById('shortDescription')?.value || '',
        detailedDescription: editor ? editor.innerHTML : '',
        storeVisibility: document.querySelector('input[name="storeVisibility"]:checked')?.value || 'visible',
        variants: formData.variants,
        timestamp: new Date().toISOString()
    };
    
    return data;
}

function setButtonLoading(button, loading) {
    if (!button) return;
    
    if (loading) {
        button.classList.add('loading');
        button.disabled = true;
    } else {
        button.classList.remove('loading');
        button.disabled = false;
    }
}

// ===== AUTO-SAVE FUNCTIONALITY =====
function initAutoSave() {
    // Auto-save every 30 seconds
    autoSaveInterval = setInterval(autoSaveForm, 30000);
    
    // Save on page unload
    window.addEventListener('beforeunload', (e) => {
        const hasUnsavedChanges = checkForUnsavedChanges();
        if (hasUnsavedChanges) {
            autoSaveForm();
            e.preventDefault();
            e.returnValue = translate('unsaved_changes');
        }
    });
}

function autoSaveForm() {
    const autoSaveData = collectFormData();
    localStorage.setItem('productAutoSave', JSON.stringify(autoSaveData));
}

function clearAutoSave() {
    localStorage.removeItem('productAutoSave');
    if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
    }
}

function checkForUnsavedChanges() {
    const currentData = collectFormData();
    return Object.values(currentData).some(value => 
        value && value !== '' && value !== 'visible'
    );
}

// ===== UI UTILITIES =====
function showLoadingOverlay(show) {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        if (show) {
            overlay.classList.add('show');
        } else {
            overlay.classList.remove('show');
        }
    }
}

function initDropdownMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const dropdownMenu = document.getElementById('dropdownMenu');
    
    if (menuToggle && dropdownMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdownMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                dropdownMenu.classList.remove('active');
            }
        });
        
        // Close dropdown when clicking on links
        dropdownMenu.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', () => {
                dropdownMenu.classList.remove('active');
            });
        });
    }
}

// ===== NOTIFICATION SYSTEM =====
function showToast(type, title, message, duration = 5000) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-times-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="${icons[type] || icons.info}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Add close functionality
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => removeToast(toast));
    
    // Auto-remove after duration
    setTimeout(() => removeToast(toast), duration);
}

function removeToast(toast) {
    if (toast && toast.parentNode) {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }
}

// ===== MODAL SYSTEM =====
function showModal(type, title, message) {
    const modalOverlay = document.getElementById('modalOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const modalConfirm = document.getElementById('modalConfirm');
    const modalClose = document.getElementById('modalClose');
    
    if (!modalOverlay) return;
    
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    
    modalOverlay.classList.add('show');
    
    // Close handlers
    const closeModal = () => {
        modalOverlay.classList.remove('show');
    };
    
    modalConfirm.onclick = closeModal;
    modalClose.onclick = closeModal;
    
    modalOverlay.onclick = (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    };
    
    // ESC key handler
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    };
    
    document.addEventListener('keydown', escHandler);
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all systems
    initValidationRules();
    initFormHandling();
    initDropzones();
    initVariantSystem();
    initAutoSave();
    initDropdownMenu();
    initWysiwygEditor();
    
    // Set up language system
    updateLanguage();
    
    // Language toggle
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
    
    // Initial progress calculation
    calculateProgress();
    
    console.log('YouZinElegancia Product Form initialized successfully!');
});

// ===== GLOBAL FUNCTIONS (for HTML onclick handlers) =====
window.removeVariant = removeVariant;
window.updateVariantName = updateVariantName;
window.handleVariantValueKeyPress = handleVariantValueKeyPress;
window.addVariantValue = addVariantValue;
window.removeVariantValue = removeVariantValue;
window.removeMainImage = removeMainImage;
window.removeGalleryImage = removeGalleryImage;