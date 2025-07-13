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
      
