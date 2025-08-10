"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const Question_model_1 = __importDefault(require("../models/Question.model"));
const types_1 = require("../types");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const competencies = [
    'Basic Computer Skills',
    'Internet Navigation',
    'Email Communication',
    'Word Processing',
    'Spreadsheets',
    'Presentations',
    'Digital Security',
    'Online Privacy',
    'Social Media',
    'Cloud Storage',
    'Digital Communication',
    'Online Collaboration',
    'Digital Content Creation',
    'Programming Basics',
    'Data Management',
    'Digital Problem Solving',
    'Digital Ethics',
    'Online Learning',
    'Digital Marketing',
    'E-commerce',
    'Digital Project Management',
    'Advanced Digital Tools'
];
const generateQuestions = () => {
    const questions = [];
    // Basic Computer Skills
    questions.push(
    // A1 Level
    {
        competency: 'Basic Computer Skills',
        level: types_1.CompetencyLevel.A1,
        questionText: 'What is the primary function of a computer mouse?',
        options: {
            a: 'To type text',
            b: 'To point, click, and navigate on screen',
            c: 'To play music',
            d: 'To connect to the internet'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'A computer mouse is primarily used for pointing, clicking, and navigating on the computer screen.',
        timeLimit: 60,
        isActive: true
    }, {
        competency: 'Basic Computer Skills',
        level: types_1.CompetencyLevel.A1,
        questionText: 'Which key combination is commonly used to copy text?',
        options: {
            a: 'Ctrl + X',
            b: 'Ctrl + V',
            c: 'Ctrl + C',
            d: 'Ctrl + Z'
        },
        correctAnswer: 'c',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Ctrl + C is the standard keyboard shortcut for copying selected text or objects.',
        timeLimit: 60,
        isActive: true
    }, 
    // A2 Level
    {
        competency: 'Basic Computer Skills',
        level: types_1.CompetencyLevel.A2,
        questionText: 'What does "right-clicking" on a file typically do?',
        options: {
            a: 'Deletes the file',
            b: 'Opens the file',
            c: 'Shows a context menu with options',
            d: 'Copies the file'
        },
        correctAnswer: 'c',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Right-clicking on a file opens a context menu that shows various options like copy, cut, delete, properties, etc.',
        timeLimit: 60,
        isActive: true
    }, {
        competency: 'Basic Computer Skills',
        level: types_1.CompetencyLevel.A2,
        questionText: 'Which of the following is used to organize files on a computer?',
        options: {
            a: 'Folders',
            b: 'Desktop wallpaper',
            c: 'Screen saver',
            d: 'Taskbar'
        },
        correctAnswer: 'a',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Folders are used to organize and group related files together on a computer system.',
        timeLimit: 60,
        isActive: true
    }, 
    // B1 Level
    {
        competency: 'Basic Computer Skills',
        level: types_1.CompetencyLevel.B1,
        questionText: 'What is the purpose of the Windows Task Manager?',
        options: {
            a: 'To browse the internet',
            b: 'To monitor and manage running programs and system performance',
            c: 'To play multimedia files',
            d: 'To create documents'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Task Manager allows users to monitor system performance, manage running processes, and end unresponsive applications.',
        timeLimit: 90,
        isActive: true
    }, {
        competency: 'Basic Computer Skills',
        level: types_1.CompetencyLevel.B1,
        questionText: 'What does defragmenting a hard drive accomplish?',
        options: {
            a: 'Increases internet speed',
            b: 'Reorganizes data to improve performance',
            c: 'Adds more storage space',
            d: 'Removes viruses'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Defragmentation reorganizes data on the hard drive so that files are stored in contiguous blocks, improving access speed.',
        timeLimit: 90,
        isActive: true
    }, 
    // B2 Level
    {
        competency: 'Basic Computer Skills',
        level: types_1.CompetencyLevel.B2,
        questionText: 'What is the difference between system software and application software?',
        options: {
            a: 'System software is more expensive than application software',
            b: 'System software manages hardware resources, while application software performs specific tasks for users',
            c: 'There is no difference between them',
            d: 'Application software runs faster than system software'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'System software (like operating systems) manages computer hardware and resources, while application software performs specific tasks for end users.',
        timeLimit: 120,
        isActive: true
    }, {
        competency: 'Basic Computer Skills',
        level: types_1.CompetencyLevel.B2,
        questionText: 'What is virtual memory in computer systems?',
        options: {
            a: 'Memory that doesn\'t exist',
            b: 'A technique that uses hard disk space to extend RAM',
            c: 'Memory used only for graphics',
            d: 'Backup memory for emergencies'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Virtual memory allows the system to use hard disk space as an extension of RAM when physical memory is insufficient.',
        timeLimit: 120,
        isActive: true
    }, 
    // C1 Level
    {
        competency: 'Basic Computer Skills',
        level: types_1.CompetencyLevel.C1,
        questionText: 'What is the primary advantage of using solid-state drives (SSDs) over traditional hard disk drives (HDDs)?',
        options: {
            a: 'SSDs are cheaper than HDDs',
            b: 'SSDs have faster data access speeds and are more reliable',
            c: 'SSDs store more data than HDDs',
            d: 'SSDs use more power than HDDs'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'SSDs have no moving parts, resulting in faster data access, better durability, and lower power consumption compared to HDDs.',
        timeLimit: 150,
        isActive: true
    }, {
        competency: 'Basic Computer Skills',
        level: types_1.CompetencyLevel.C1,
        questionText: 'What does BIOS/UEFI firmware do in a computer system?',
        options: {
            a: 'Manages internet connections',
            b: 'Initializes hardware components during boot process',
            c: 'Runs application software',
            d: 'Stores user data'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'BIOS/UEFI firmware initializes and tests hardware components during the boot process before loading the operating system.',
        timeLimit: 150,
        isActive: true
    }, 
    // C2 Level
    {
        competency: 'Basic Computer Skills',
        level: types_1.CompetencyLevel.C2,
        questionText: 'In computer architecture, what is the purpose of CPU cache hierarchy (L1, L2, L3)?',
        options: {
            a: 'To store different types of files',
            b: 'To provide different levels of fast memory access to reduce CPU wait times',
            c: 'To connect multiple CPUs together',
            d: 'To manage power consumption'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'CPU cache hierarchy provides progressively larger but slower memory levels (L1, L2, L3) to minimize CPU wait times for data access.',
        timeLimit: 180,
        isActive: true
    }, {
        competency: 'Basic Computer Skills',
        level: types_1.CompetencyLevel.C2,
        questionText: 'What is the role of a hypervisor in virtualization technology?',
        options: {
            a: 'To supervise user activities',
            b: 'To manage and allocate hardware resources among multiple virtual machines',
            c: 'To increase internet bandwidth',
            d: 'To encrypt data storage'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'A hypervisor is software that creates and manages virtual machines by allocating and managing hardware resources among them.',
        timeLimit: 180,
        isActive: true
    }, 
    // Internet Navigation
    // A1 Level
    {
        competency: 'Internet Navigation',
        level: types_1.CompetencyLevel.A1,
        questionText: 'What is a web browser used for?',
        options: {
            a: 'To create documents',
            b: 'To access and view websites on the internet',
            c: 'To manage files',
            d: 'To play games'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'A web browser is software used to access and view websites and web pages on the internet.',
        timeLimit: 60,
        isActive: true
    }, {
        competency: 'Internet Navigation',
        level: types_1.CompetencyLevel.A1,
        questionText: 'What does "www" typically stand for in website addresses?',
        options: {
            a: 'World Wide Web',
            b: 'What We Want',
            c: 'Where We Work',
            d: 'When We Want'
        },
        correctAnswer: 'a',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'WWW stands for World Wide Web, which is the system of interlinked hypertext documents accessed via the internet.',
        timeLimit: 60,
        isActive: true
    }, 
    // A2 Level
    {
        competency: 'Internet Navigation',
        level: types_1.CompetencyLevel.A2,
        questionText: 'What is a hyperlink on a webpage?',
        options: {
            a: 'A type of virus',
            b: 'Clickable text or image that takes you to another page or location',
            c: 'A way to close the browser',
            d: 'A type of advertisement'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'A hyperlink is clickable text or image that, when clicked, takes the user to another webpage or location.',
        timeLimit: 60,
        isActive: true
    }, {
        competency: 'Internet Navigation',
        level: types_1.CompetencyLevel.A2,
        questionText: 'What does the "Back" button in a web browser do?',
        options: {
            a: 'Closes the browser',
            b: 'Returns to the previously viewed webpage',
            c: 'Refreshes the current page',
            d: 'Opens a new tab'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'The Back button returns you to the webpage you were viewing before the current one.',
        timeLimit: 60,
        isActive: true
    }, 
    // B1 Level
    {
        competency: 'Internet Navigation',
        level: types_1.CompetencyLevel.B1,
        questionText: 'What is the purpose of bookmarks/favorites in a web browser?',
        options: {
            a: 'To delete unwanted websites',
            b: 'To save website addresses for easy access later',
            c: 'To block advertisements',
            d: 'To increase internet speed'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Bookmarks (or favorites) allow you to save website URLs so you can quickly return to them without typing the address.',
        timeLimit: 90,
        isActive: true
    }, {
        competency: 'Internet Navigation',
        level: types_1.CompetencyLevel.B1,
        questionText: 'What does "https://" indicate in a website URL?',
        options: {
            a: 'The website is under construction',
            b: 'The connection to the website is secure and encrypted',
            c: 'The website is free to use',
            d: 'The website loads faster'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'HTTPS indicates that the connection between your browser and the website is secure and encrypted using SSL/TLS protocols.',
        timeLimit: 90,
        isActive: true
    }, 
    // B2 Level
    {
        competency: 'Internet Navigation',
        level: types_1.CompetencyLevel.B2,
        questionText: 'What is the purpose of browser cookies?',
        options: {
            a: 'To make websites load slower',
            b: 'To store small pieces of data about user preferences and activities',
            c: 'To display advertisements only',
            d: 'To prevent access to websites'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Browser cookies store small pieces of data about user preferences, login status, and browsing activities to enhance user experience.',
        timeLimit: 120,
        isActive: true
    }, {
        competency: 'Internet Navigation',
        level: types_1.CompetencyLevel.B2,
        questionText: 'What is the difference between the surface web and the deep web?',
        options: {
            a: 'Surface web is faster than deep web',
            b: 'Surface web is indexed by search engines, deep web is not',
            c: 'There is no difference',
            d: 'Deep web is only for illegal activities'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'The surface web consists of publicly accessible pages indexed by search engines, while the deep web contains pages not indexed by search engines.',
        timeLimit: 120,
        isActive: true
    }, 
    // C1 Level
    {
        competency: 'Internet Navigation',
        level: types_1.CompetencyLevel.C1,
        questionText: 'What is the purpose of DNS (Domain Name System) in internet navigation?',
        options: {
            a: 'To create websites',
            b: 'To translate domain names into IP addresses',
            c: 'To provide internet security',
            d: 'To store website content'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'DNS translates human-readable domain names (like google.com) into IP addresses that computers use to locate and connect to servers.',
        timeLimit: 150,
        isActive: true
    }, {
        competency: 'Internet Navigation',
        level: types_1.CompetencyLevel.C1,
        questionText: 'What is the role of HTTP status codes in web navigation?',
        options: {
            a: 'To count website visitors',
            b: 'To indicate the result of server processing of client requests',
            c: 'To measure internet speed',
            d: 'To display website content'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'HTTP status codes (like 200 OK, 404 Not Found) communicate the result of server processing of client requests.',
        timeLimit: 150,
        isActive: true
    }, 
    // C2 Level
    {
        competency: 'Internet Navigation',
        level: types_1.CompetencyLevel.C2,
        questionText: 'How does Content Delivery Network (CDN) technology improve web navigation experience?',
        options: {
            a: 'By increasing website security only',
            b: 'By distributing content across multiple geographic locations to reduce load times',
            c: 'By compressing all images',
            d: 'By blocking malicious websites'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'CDNs distribute website content across multiple servers worldwide, allowing users to access content from the nearest server, reducing load times.',
        timeLimit: 180,
        isActive: true
    }, {
        competency: 'Internet Navigation',
        level: types_1.CompetencyLevel.C2,
        questionText: 'What is the significance of HTTP/2 protocol over HTTP/1.1 for web navigation?',
        options: {
            a: 'HTTP/2 only works with mobile devices',
            b: 'HTTP/2 provides improved performance through multiplexing and server push capabilities',
            c: 'HTTP/2 is less secure than HTTP/1.1',
            d: 'HTTP/2 uses more bandwidth'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'HTTP/2 offers performance improvements including multiplexing (multiple requests over single connection) and server push capabilities.',
        timeLimit: 180,
        isActive: true
    }, 
    // Email Communication
    // A1 Level
    {
        competency: 'Email Communication',
        level: types_1.CompetencyLevel.A1,
        questionText: 'What information is required to send an email?',
        options: {
            a: 'Only the message content',
            b: 'Recipients email address and subject line',
            c: 'Only the recipient\'s phone number',
            d: 'Only your name'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'To send an email, you need at minimum the recipient\'s email address. A subject line is also essential for clarity.',
        timeLimit: 60,
        isActive: true
    }, {
        competency: 'Email Communication',
        level: types_1.CompetencyLevel.A1,
        questionText: 'What does "CC" mean in email?',
        options: {
            a: 'Copy Cat',
            b: 'Carbon Copy',
            c: 'Computer Code',
            d: 'Create Copy'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'CC stands for Carbon Copy, allowing you to send a copy of the email to additional recipients.',
        timeLimit: 60,
        isActive: true
    }, 
    // A2 Level
    {
        competency: 'Email Communication',
        level: types_1.CompetencyLevel.A2,
        questionText: 'What is the difference between "Reply" and "Reply All"?',
        options: {
            a: 'There is no difference',
            b: 'Reply sends response only to sender, Reply All sends to sender and all other recipients',
            c: 'Reply All is faster than Reply',
            d: 'Reply All uses more internet data'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Reply sends your response only to the original sender, while Reply All sends it to the sender and all other recipients of the original email.',
        timeLimit: 60,
        isActive: true
    }, {
        competency: 'Email Communication',
        level: types_1.CompetencyLevel.A2,
        questionText: 'What is an email attachment?',
        options: {
            a: 'Extra text added to email',
            b: 'A file sent along with the email message',
            c: 'The email address',
            d: 'The subject line'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'An email attachment is a file (document, image, etc.) that is sent along with an email message.',
        timeLimit: 60,
        isActive: true
    }, 
    // B1 Level
    {
        competency: 'Email Communication',
        level: types_1.CompetencyLevel.B1,
        questionText: 'What is email etiquette and why is it important?',
        options: {
            a: 'Rules for email decoration',
            b: 'Professional guidelines for appropriate email communication',
            c: 'Technical requirements for sending emails',
            d: 'Legal requirements for email'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Email etiquette refers to professional guidelines that ensure appropriate, respectful, and effective email communication.',
        timeLimit: 90,
        isActive: true
    }, {
        competency: 'Email Communication',
        level: types_1.CompetencyLevel.B1,
        questionText: 'What should you do before opening an email attachment from an unknown sender?',
        options: {
            a: 'Open it immediately',
            b: 'Scan it with antivirus software and verify the sender',
            c: 'Forward it to friends',
            d: 'Print it first'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Unknown attachments can contain malware. Always scan with antivirus software and verify the sender before opening.',
        timeLimit: 90,
        isActive: true
    }, 
    // B2 Level
    {
        competency: 'Email Communication',
        level: types_1.CompetencyLevel.B2,
        questionText: 'What is the purpose of email encryption?',
        options: {
            a: 'To make emails load faster',
            b: 'To protect email content from unauthorized access during transmission',
            c: 'To reduce email size',
            d: 'To add colors to emails'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Email encryption protects the content of emails from being read by unauthorized parties during transmission and storage.',
        timeLimit: 120,
        isActive: true
    }, {
        competency: 'Email Communication',
        level: types_1.CompetencyLevel.B2,
        questionText: 'What are email filters and how do they help manage inbox?',
        options: {
            a: 'They delete all emails automatically',
            b: 'They automatically organize emails based on specified criteria',
            c: 'They change email colors',
            d: 'They increase email storage'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Email filters automatically sort, label, or perform actions on incoming emails based on criteria like sender, subject, or keywords.',
        timeLimit: 120,
        isActive: true
    }, 
    // C1 Level
    {
        competency: 'Email Communication',
        level: types_1.CompetencyLevel.C1,
        questionText: 'What is the difference between POP3 and IMAP email protocols?',
        options: {
            a: 'POP3 is newer than IMAP',
            b: 'IMAP synchronizes emails across devices, POP3 downloads emails to one device',
            c: 'IMAP is less secure than POP3',
            d: 'There is no difference'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'IMAP keeps emails on the server and synchronizes across multiple devices, while POP3 downloads emails to a single device.',
        timeLimit: 150,
        isActive: true
    }, {
        competency: 'Email Communication',
        level: types_1.CompetencyLevel.C1,
        questionText: 'What is S/MIME (Secure/Multipurpose Internet Mail Extensions)?',
        options: {
            a: 'A type of email attachment',
            b: 'A standard for public key encryption and signing of MIME data',
            c: 'A way to send large files',
            d: 'An email client software'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'S/MIME is a standard for public key encryption and signing of MIME data, providing authentication, message integrity, and non-repudiation.',
        timeLimit: 150,
        isActive: true
    }, 
    // C2 Level
    {
        competency: 'Email Communication',
        level: types_1.CompetencyLevel.C2,
        questionText: 'How does SPF (Sender Policy Framework) help prevent email spoofing?',
        options: {
            a: 'By encrypting all emails',
            b: 'By allowing domain owners to specify which servers can send emails on their behalf',
            c: 'By blocking all external emails',
            d: 'By requiring passwords for all emails'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'SPF allows domain owners to publish DNS records specifying which mail servers are authorized to send emails from their domain.',
        timeLimit: 180,
        isActive: true
    }, {
        competency: 'Email Communication',
        level: types_1.CompetencyLevel.C2,
        questionText: 'What is DMARC (Domain-based Message Authentication, Reporting, and Conformance) and its role in email security?',
        options: {
            a: 'A type of email client',
            b: 'An email authentication protocol that builds on SPF and DKIM to prevent email spoofing',
            c: 'A method for compressing emails',
            d: 'A way to schedule email delivery'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'DMARC is an authentication protocol that uses SPF and DKIM to prevent email spoofing and provides reporting on email authentication results.',
        timeLimit: 180,
        isActive: true
    }, 
    // Word Processing
    // A1 Level
    {
        competency: 'Word Processing',
        level: types_1.CompetencyLevel.A1,
        questionText: 'What is the primary purpose of word processing software?',
        options: {
            a: 'To browse the internet',
            b: 'To create, edit, and format text documents',
            c: 'To play music',
            d: 'To manage emails'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Word processing software is designed to create, edit, format, and print text documents.',
        timeLimit: 60,
        isActive: true
    }, {
        competency: 'Word Processing',
        level: types_1.CompetencyLevel.A1,
        questionText: 'Which of the following is a common word processing software?',
        options: {
            a: 'Calculator',
            b: 'Microsoft Word',
            c: 'Web browser',
            d: 'Music player'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Microsoft Word is one of the most widely used word processing applications.',
        timeLimit: 60,
        isActive: true
    }, 
    // A2 Level
    {
        competency: 'Word Processing',
        level: types_1.CompetencyLevel.A2,
        questionText: 'How do you make text bold in most word processors?',
        options: {
            a: 'Press Ctrl + I',
            b: 'Press Ctrl + B',
            c: 'Press Ctrl + U',
            d: 'Press Ctrl + S'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Ctrl + B is the standard keyboard shortcut for making selected text bold in most word processors.',
        timeLimit: 60,
        isActive: true
    }, {
        competency: 'Word Processing',
        level: types_1.CompetencyLevel.A2,
        questionText: 'What does the "Find and Replace" feature do?',
        options: {
            a: 'Finds lost files',
            b: 'Locates specific text and optionally replaces it with different text',
            c: 'Replaces the entire document',
            d: 'Finds spelling errors only'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Find and Replace allows you to locate specific text in a document and replace it with different text throughout the document.',
        timeLimit: 60,
        isActive: true
    }, 
    // B1 Level
    {
        competency: 'Word Processing',
        level: types_1.CompetencyLevel.B1,
        questionText: 'What is the purpose of styles in word processing?',
        options: {
            a: 'To change document colors only',
            b: 'To apply consistent formatting to text elements throughout a document',
            c: 'To add images to documents',
            d: 'To change the font size only'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Styles allow you to apply consistent formatting (font, size, spacing, etc.) to similar text elements throughout a document.',
        timeLimit: 90,
        isActive: true
    }, {
        competency: 'Word Processing',
        level: types_1.CompetencyLevel.B1,
        questionText: 'What is a table of contents and how is it typically generated?',
        options: {
            a: 'A list of images in the document',
            b: 'An automatically generated list of headings and page numbers based on heading styles',
            c: 'A summary of the document',
            d: 'A list of all words in the document'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'A table of contents is automatically generated from heading styles in the document and shows headings with their corresponding page numbers.',
        timeLimit: 90,
        isActive: true
    }, 
    // B2 Level
    {
        competency: 'Word Processing',
        level: types_1.CompetencyLevel.B2,
        questionText: 'What is mail merge and when would you use it?',
        options: {
            a: 'Combining multiple documents into one',
            b: 'Creating personalized documents by merging a template with a data source',
            c: 'Merging different file formats',
            d: 'Combining images with text'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Mail merge creates personalized documents (like letters or labels) by combining a template with data from a source like a spreadsheet.',
        timeLimit: 120,
        isActive: true
    }, {
        competency: 'Word Processing',
        level: types_1.CompetencyLevel.B2,
        questionText: 'What are section breaks and why are they important in document formatting?',
        options: {
            a: 'They break the document into pages',
            b: 'They allow different formatting settings within different parts of the same document',
            c: 'They add space between paragraphs',
            d: 'They insert page numbers'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Section breaks divide documents into sections, allowing different formatting (headers, footers, page orientation) in different parts.',
        timeLimit: 120,
        isActive: true
    }, 
    // C1 Level
    {
        competency: 'Word Processing',
        level: types_1.CompetencyLevel.C1,
        questionText: 'What is the purpose of macros in word processing?',
        options: {
            a: 'To make text larger',
            b: 'To automate repetitive tasks through recorded or programmed sequences of commands',
            c: 'To add pictures to documents',
            d: 'To change document colors'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'Macros automate repetitive tasks by recording or programming sequences of commands that can be executed with a single action.',
        timeLimit: 150,
        isActive: true
    }, {
        competency: 'Word Processing',
        level: types_1.CompetencyLevel.C1,
        questionText: 'What is the difference between embedding and linking objects in documents?',
        options: {
            a: 'There is no difference',
            b: 'Embedding stores the object within the document, linking creates a reference to an external file',
            c: 'Linking is faster than embedding',
            d: 'Embedding only works with images'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'Embedding stores the complete object within the document, while linking creates a reference to an external file that can be updated.',
        timeLimit: 150,
        isActive: true
    }, 
    // C2 Level
    {
        competency: 'Word Processing',
        level: types_1.CompetencyLevel.C2,
        questionText: 'How do XML-based document formats (like DOCX) differ from binary formats (like DOC)?',
        options: {
            a: 'XML formats are larger than binary formats',
            b: 'XML formats use structured markup for better data recovery, compression, and interoperability',
            c: 'Binary formats are more secure',
            d: 'There is no significant difference'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'XML-based formats use structured markup, enabling better data recovery, file compression, and interoperability across different software.',
        timeLimit: 180,
        isActive: true
    }, {
        competency: 'Word Processing',
        level: types_1.CompetencyLevel.C2,
        questionText: 'What is the role of document schemas and validation in advanced word processing?',
        options: {
            a: 'To make documents look better',
            b: 'To define document structure rules and ensure compliance with specific formatting standards',
            c: 'To reduce file size',
            d: 'To add security to documents'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'Document schemas define structural rules and formatting standards, allowing validation to ensure documents comply with specific requirements.',
        timeLimit: 180,
        isActive: true
    }, 
    // Spreadsheets
    // A1 Level
    {
        competency: 'Spreadsheets',
        level: types_1.CompetencyLevel.A1,
        questionText: 'What is a spreadsheet primarily used for?',
        options: {
            a: 'Writing essays',
            b: 'Organizing data in rows and columns and performing calculations',
            c: 'Creating presentations',
            d: 'Browsing the internet'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Spreadsheets are designed to organize data in a grid of rows and columns and perform calculations on that data.',
        timeLimit: 60,
        isActive: true
    }, {
        competency: 'Spreadsheets',
        level: types_1.CompetencyLevel.A1,
        questionText: 'In a spreadsheet, what is a cell?',
        options: {
            a: 'A type of formula',
            b: 'The intersection of a row and column where data can be entered',
            c: 'A menu option',
            d: 'A type of chart'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'A cell is the basic unit of a spreadsheet, located at the intersection of a row and column, where you can enter data.',
        timeLimit: 60,
        isActive: true
    }, 
    // A2 Level
    {
        competency: 'Spreadsheets',
        level: types_1.CompetencyLevel.A2,
        questionText: 'How do you typically start a formula in a spreadsheet cell?',
        options: {
            a: 'With a #',
            b: 'With an =',
            c: 'With a *',
            d: 'With a @'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'In most spreadsheet programs, formulas begin with an equals sign (=) to indicate that the cell contains a calculation.',
        timeLimit: 60,
        isActive: true
    }, {
        competency: 'Spreadsheets',
        level: types_1.CompetencyLevel.A2,
        questionText: 'What does the SUM function do in a spreadsheet?',
        options: {
            a: 'Counts the number of cells',
            b: 'Adds up the values in specified cells',
            c: 'Finds the largest value',
            d: 'Calculates the average'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'The SUM function adds up all the numerical values in the specified range of cells.',
        timeLimit: 60,
        isActive: true
    }, 
    // B1 Level
    {
        competency: 'Spreadsheets',
        level: types_1.CompetencyLevel.B1,
        questionText: 'What is the difference between absolute and relative cell references?',
        options: {
            a: 'Absolute references change when copied, relative references don\'t',
            b: 'Relative references change when copied, absolute references don\'t',
            c: 'There is no difference',
            d: 'Absolute references are faster'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Relative references (A1) adjust when copied to different locations, while absolute references ($A$1) remain fixed.',
        timeLimit: 90,
        isActive: true
    }, {
        competency: 'Spreadsheets',
        level: types_1.CompetencyLevel.B1,
        questionText: 'What is conditional formatting in spreadsheets?',
        options: {
            a: 'Formatting that only works on weekends',
            b: 'Formatting that changes cell appearance based on cell values or conditions',
            c: 'Formatting that requires permission',
            d: 'Formatting that costs extra money'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Conditional formatting automatically changes cell formatting (color, font, etc.) based on the cell\'s value or specified conditions.',
        timeLimit: 90,
        isActive: true
    }, 
    // B2 Level
    {
        competency: 'Spreadsheets',
        level: types_1.CompetencyLevel.B2,
        questionText: 'What is a pivot table used for?',
        options: {
            a: 'Creating charts only',
            b: 'Summarizing, analyzing, and presenting large amounts of data in a compact format',
            c: 'Storing images',
            d: 'Creating animations'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Pivot tables allow you to summarize, analyze, explore, and present data by grouping and aggregating information from larger datasets.',
        timeLimit: 120,
        isActive: true
    }, {
        competency: 'Spreadsheets',
        level: types_1.CompetencyLevel.B2,
        questionText: 'What is VLOOKUP function used for?',
        options: {
            a: 'To look up values vertically in a table and return corresponding data from another column',
            b: 'To create vertical charts',
            c: 'To validate data entry',
            d: 'To sort data vertically'
        },
        correctAnswer: 'a',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'VLOOKUP searches for a value in the first column of a range and returns a value in the same row from a specified column.',
        timeLimit: 120,
        isActive: true
    }, 
    // C1 Level
    {
        competency: 'Spreadsheets',
        level: types_1.CompetencyLevel.C1,
        questionText: 'What is the purpose of array formulas in advanced spreadsheet usage?',
        options: {
            a: 'To create arrays of data',
            b: 'To perform calculations on multiple values simultaneously and return multiple results',
            c: 'To arrange data in arrays',
            d: 'To format data in array patterns'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'Array formulas perform multiple calculations on one or more sets of values and can return either single or multiple results.',
        timeLimit: 150,
        isActive: true
    }, {
        competency: 'Spreadsheets',
        level: types_1.CompetencyLevel.C1,
        questionText: 'What is the difference between XLOOKUP and VLOOKUP functions?',
        options: {
            a: 'XLOOKUP is older than VLOOKUP',
            b: 'XLOOKUP is more flexible, allowing lookups in any direction and returning multiple values',
            c: 'VLOOKUP is more powerful than XLOOKUP',
            d: 'They are identical functions'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'XLOOKUP is more flexible than VLOOKUP, allowing searches in any direction, exact matches by default, and can return multiple values.',
        timeLimit: 150,
        isActive: true
    }, 
    // C2 Level
    {
        competency: 'Spreadsheets',
        level: types_1.CompetencyLevel.C2,
        questionText: 'How do Power Query and Power Pivot enhance spreadsheet capabilities?',
        options: {
            a: 'They only add visual effects',
            b: 'They provide advanced data transformation, modeling, and business intelligence capabilities',
            c: 'They increase calculation speed only',
            d: 'They add more chart types'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'Power Query enables advanced data transformation and connection capabilities, while Power Pivot provides data modeling and business intelligence features.',
        timeLimit: 180,
        isActive: true
    }, {
        competency: 'Spreadsheets',
        level: types_1.CompetencyLevel.C2,
        questionText: 'What is DAX (Data Analysis Expressions) and when is it used?',
        options: {
            a: 'A type of chart format',
            b: 'A formula language for creating custom calculations in data models and Power Pivot',
            c: 'A data validation method',
            d: 'A spreadsheet file format'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'DAX is a formula language used in Power Pivot, Power BI, and other Microsoft tools for creating custom calculations and measures in data models.',
        timeLimit: 180,
        isActive: true
    }, 
    // Presentations
    // A1 Level
    {
        competency: 'Presentations',
        level: types_1.CompetencyLevel.A1,
        questionText: 'What is presentation software primarily used for?',
        options: {
            a: 'Writing long documents',
            b: 'Creating visual slideshows to support presentations',
            c: 'Managing emails',
            d: 'Editing videos'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Presentation software is designed to create visual slideshows with text, images, and multimedia to support oral presentations.',
        timeLimit: 60,
        isActive: true
    }, {
        competency: 'Presentations',
        level: types_1.CompetencyLevel.A1,
        questionText: 'What is a slide in presentation software?',
        options: {
            a: 'A type of animation',
            b: 'A single page or screen in a presentation',
            c: 'A presentation template',
            d: 'A sound effect'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'A slide is an individual page or screen within a presentation that contains content like text, images, or other media.',
        timeLimit: 60,
        isActive: true
    }, 
    // A2 Level
    {
        competency: 'Presentations',
        level: types_1.CompetencyLevel.A2,
        questionText: 'What is a presentation template?',
        options: {
            a: 'A finished presentation',
            b: 'A pre-designed format with layouts, colors, and fonts for creating presentations',
            c: 'A presentation topic',
            d: 'A type of animation'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'A template is a pre-designed presentation format that includes consistent layouts, color schemes, and fonts to maintain visual consistency.',
        timeLimit: 60,
        isActive: true
    }, {
        competency: 'Presentations',
        level: types_1.CompetencyLevel.A2,
        questionText: 'What is the purpose of slide transitions?',
        options: {
            a: 'To add text to slides',
            b: 'To create visual effects when moving from one slide to another',
            c: 'To delete slides',
            d: 'To print presentations'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Slide transitions are visual effects that play when moving from one slide to the next during a presentation.',
        timeLimit: 60,
        isActive: true
    }, 
    // B1 Level
    {
        competency: 'Presentations',
        level: types_1.CompetencyLevel.B1,
        questionText: 'What are presentation animations and how do they differ from transitions?',
        options: {
            a: 'Animations and transitions are the same thing',
            b: 'Animations affect individual elements on a slide, transitions affect the entire slide',
            c: 'Transitions are more important than animations',
            d: 'Animations only work with text'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Animations control how individual elements (text, images) appear, disappear, or move on a slide, while transitions control how slides change.',
        timeLimit: 90,
        isActive: true
    }, {
        competency: 'Presentations',
        level: types_1.CompetencyLevel.B1,
        questionText: 'What is the presenter view and why is it useful?',
        options: {
            a: 'A view that shows only images',
            b: 'A view that shows the current slide, next slide, and speaker notes to the presenter only',
            c: 'A view for editing slides',
            d: 'A view that shows all slides at once'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Presenter view shows the current slide, next slide, elapsed time, and speaker notes to the presenter while the audience sees only the current slide.',
        timeLimit: 90,
        isActive: true
    }, 
    // B2 Level
    {
        competency: 'Presentations',
        level: types_1.CompetencyLevel.B2,
        questionText: 'What is the purpose of slide masters in presentation design?',
        options: {
            a: 'To create animations',
            b: 'To define consistent formatting and layouts that apply to all slides in the presentation',
            c: 'To add sound effects',
            d: 'To create handouts'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Slide masters define the overall formatting, fonts, colors, and layouts that are consistently applied throughout the entire presentation.',
        timeLimit: 120,
        isActive: true
    }, {
        competency: 'Presentations',
        level: types_1.CompetencyLevel.B2,
        questionText: 'What are effective design principles for creating professional presentations?',
        options: {
            a: 'Use as many colors and fonts as possible',
            b: 'Apply consistency, simplicity, proper contrast, and readable fonts throughout',
            c: 'Fill every slide with maximum text',
            d: 'Use different layouts for each slide'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Professional presentations should maintain consistency, use simple clean designs, ensure proper contrast, and employ readable fonts.',
        timeLimit: 120,
        isActive: true
    }, 
    // C1 Level
    {
        competency: 'Presentations',
        level: types_1.CompetencyLevel.C1,
        questionText: 'What is the purpose of multimedia integration in advanced presentations?',
        options: {
            a: 'To make presentations longer',
            b: 'To enhance audience engagement and understanding through video, audio, and interactive elements',
            c: 'To increase file size',
            d: 'To make presentations more complicated'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'Multimedia integration (videos, audio, interactive elements) enhances audience engagement and can improve comprehension of complex topics.',
        timeLimit: 150,
        isActive: true
    }, {
        competency: 'Presentations',
        level: types_1.CompetencyLevel.C1,
        questionText: 'What are interactive presentation techniques and their benefits?',
        options: {
            a: 'Techniques that require no audience participation',
            b: 'Methods that engage audience through polls, Q&A, clickable elements, and real-time feedback',
            c: 'Techniques that only work online',
            d: 'Methods that eliminate the need for a presenter'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'Interactive techniques like polls, Q&A sessions, clickable navigation, and real-time feedback increase audience engagement and retention.',
        timeLimit: 150,
        isActive: true
    }, 
    // C2 Level
    {
        competency: 'Presentations',
        level: types_1.CompetencyLevel.C2,
        questionText: 'How can data visualization principles enhance presentation effectiveness?',
        options: {
            a: 'By adding more colors to charts',
            b: 'By applying cognitive load theory, visual hierarchy, and appropriate chart types for different data types',
            c: 'By making all charts the same size',
            d: 'By using only text instead of visuals'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'Effective data visualization applies cognitive load theory, establishes clear visual hierarchy, and selects appropriate chart types based on data relationships.',
        timeLimit: 180,
        isActive: true
    }, {
        competency: 'Presentations',
        level: types_1.CompetencyLevel.C2,
        questionText: 'What is the role of storytelling and narrative structure in professional presentations?',
        options: {
            a: 'To entertain the audience only',
            b: 'To create logical flow, emotional connection, and memorable message delivery through structured narrative',
            c: 'To make presentations longer',
            d: 'To replace factual information'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'Storytelling creates logical flow, establishes emotional connections, and makes presentations more memorable through structured narrative techniques.',
        timeLimit: 180,
        isActive: true
    }, 
    // Digital Security
    // A1 Level
    {
        competency: 'Digital Security',
        level: types_1.CompetencyLevel.A1,
        questionText: 'What is a strong password?',
        options: {
            a: 'Your name and birth year',
            b: 'A combination of letters, numbers, and special characters that is difficult to guess',
            c: 'The same password for all accounts',
            d: 'A simple word like "password"'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'A strong password combines uppercase and lowercase letters, numbers, and special characters to make it difficult to guess or crack.',
        timeLimit: 60,
        isActive: true
    }, {
        competency: 'Digital Security',
        level: types_1.CompetencyLevel.A1,
        questionText: 'What should you do if you receive a suspicious email asking for personal information?',
        options: {
            a: 'Reply with all requested information',
            b: 'Delete the email and do not provide any personal information',
            c: 'Forward it to all your contacts',
            d: 'Click all links in the email'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Suspicious emails requesting personal information are often phishing attempts. Never provide personal information and delete such emails.',
        timeLimit: 60,
        isActive: true
    }, 
    // A2 Level
    {
        competency: 'Digital Security',
        level: types_1.CompetencyLevel.A2,
        questionText: 'What is antivirus software and why is it important?',
        options: {
            a: 'Software that creates viruses',
            b: 'Software that detects and removes malicious programs from your computer',
            c: 'Software that speeds up your computer',
            d: 'Software that manages files'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Antivirus software identifies, prevents, and removes malicious software (viruses, malware) that could harm your computer or steal data.',
        timeLimit: 60,
        isActive: true
    }, {
        competency: 'Digital Security',
        level: types_1.CompetencyLevel.A2,
        questionText: 'What is two-factor authentication (2FA)?',
        options: {
            a: 'Using two different passwords',
            b: 'A security method that requires two different forms of identification',
            c: 'Having two user accounts',
            d: 'Using two different computers'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Two-factor authentication adds an extra security layer by requiring a second form of identification (like a phone code) beyond just a password.',
        timeLimit: 60,
        isActive: true
    }, 
    // B1 Level
    {
        competency: 'Digital Security',
        level: types_1.CompetencyLevel.B1,
        questionText: 'What is phishing and how can you identify phishing attempts?',
        options: {
            a: 'A type of fishing sport',
            b: 'Fraudulent attempts to obtain sensitive information by impersonating trustworthy entities',
            c: 'A computer game',
            d: 'A type of computer virus'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Phishing involves cybercriminals impersonating legitimate organizations to trick people into revealing sensitive information like passwords or credit card numbers.',
        timeLimit: 90,
        isActive: true
    }, {
        competency: 'Digital Security',
        level: types_1.CompetencyLevel.B1,
        questionText: 'What is the purpose of regular software updates in digital security?',
        options: {
            a: 'To make software run slower',
            b: 'To fix security vulnerabilities and protect against new threats',
            c: 'To change the software appearance',
            d: 'To increase file size'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Software updates often include security patches that fix vulnerabilities and protect against newly discovered threats and attack methods.',
        timeLimit: 90,
        isActive: true
    }, 
    // B2 Level
    {
        competency: 'Digital Security',
        level: types_1.CompetencyLevel.B2,
        questionText: 'What is ransomware and how can it be prevented?',
        options: {
            a: 'Software that improves computer performance',
            b: 'Malicious software that encrypts files and demands payment for decryption',
            c: 'A type of antivirus program',
            d: 'Software for managing passwords'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Ransomware encrypts user files and demands payment for decryption. Prevention includes regular backups, updated software, and careful email handling.',
        timeLimit: 120,
        isActive: true
    }, {
        competency: 'Digital Security',
        level: types_1.CompetencyLevel.B2,
        questionText: 'What is a VPN (Virtual Private Network) and why might you use one?',
        options: {
            a: 'A type of social network',
            b: 'A service that creates a secure, encrypted connection over the internet',
            c: 'A video streaming service',
            d: 'A file storage system'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'A VPN creates an encrypted tunnel for internet traffic, providing privacy, security, and the ability to access geo-restricted content.',
        timeLimit: 120,
        isActive: true
    }, 
    // C1 Level
    {
        competency: 'Digital Security',
        level: types_1.CompetencyLevel.C1,
        questionText: 'What is the principle of least privilege in cybersecurity?',
        options: {
            a: 'Giving users maximum access to all systems',
            b: 'Providing users with the minimum access rights necessary to perform their job functions',
            c: 'Restricting all users from accessing any systems',
            d: 'Giving privileges based on seniority only'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'The principle of least privilege limits user access rights to the minimum necessary for their role, reducing potential damage from compromised accounts.',
        timeLimit: 150,
        isActive: true
    }, {
        competency: 'Digital Security',
        level: types_1.CompetencyLevel.C1,
        questionText: 'What is social engineering in cybersecurity context?',
        options: {
            a: 'Building social networks',
            b: 'Psychological manipulation to trick people into divulging confidential information',
            c: 'Engineering social media platforms',
            d: 'Creating social groups online'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'Social engineering uses psychological manipulation to trick individuals into breaking normal security procedures and revealing confidential information.',
        timeLimit: 150,
        isActive: true
    }, 
    // C2 Level
    {
        competency: 'Digital Security',
        level: types_1.CompetencyLevel.C2,
        questionText: 'What is zero-trust security architecture and how does it differ from traditional security models?',
        options: {
            a: 'A model that trusts no one',
            b: 'A security model that verifies every user and device before granting access, regardless of location',
            c: 'A model that only works internally',
            d: 'A traditional firewall approach'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'Zero-trust assumes no implicit trust and verifies every user and device before granting access, unlike traditional perimeter-based security.',
        timeLimit: 180,
        isActive: true
    }, {
        competency: 'Digital Security',
        level: types_1.CompetencyLevel.C2,
        questionText: 'What is the role of Security Information and Event Management (SIEM) systems?',
        options: {
            a: 'To create security policies',
            b: 'To collect, analyze, and correlate security events from multiple sources for threat detection',
            c: 'To manage user passwords',
            d: 'To backup security data'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'SIEM systems collect and analyze security events from various sources to detect patterns, identify threats, and provide centralized security monitoring.',
        timeLimit: 180,
        isActive: true
    }, 
    // Online Privacy
    // A1 Level
    {
        competency: 'Online Privacy',
        level: types_1.CompetencyLevel.A1,
        questionText: 'What is personal information that should be kept private online?',
        options: {
            a: 'Your favorite color',
            b: 'Your full name, address, phone number, and social security number',
            c: 'Your favorite movie',
            d: 'Your school name'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Personal information like full name, address, phone number, and social security number should be kept private to prevent identity theft.',
        timeLimit: 60,
        isActive: true
    }, {
        competency: 'Online Privacy',
        level: types_1.CompetencyLevel.A1,
        questionText: 'Why should you be careful about what you post on social media?',
        options: {
            a: 'It uses too much internet data',
            b: 'Posts can be seen by many people and may affect your reputation or safety',
            c: 'It\'s against the law',
            d: 'It slows down your computer'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Social media posts can be viewed by many people and may have long-term effects on your reputation, safety, and future opportunities.',
        timeLimit: 60,
        isActive: true
    }, 
    // A2 Level
    {
        competency: 'Online Privacy',
        level: types_1.CompetencyLevel.A2,
        questionText: 'What are privacy settings on social media platforms?',
        options: {
            a: 'Settings that make posts prettier',
            b: 'Controls that let you decide who can see your posts and personal information',
            c: 'Settings that change colors',
            d: 'Settings that speed up loading'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Privacy settings allow you to control who can view your posts, personal information, and contact you on social media platforms.',
        timeLimit: 60,
        isActive: true
    }, {
        competency: 'Online Privacy',
        level: types_1.CompetencyLevel.A2,
        questionText: 'What should you do before accepting friend requests from people you don\'t know?',
        options: {
            a: 'Accept all requests immediately',
            b: 'Verify their identity and be cautious about sharing personal information',
            c: 'Share your personal information first',
            d: 'Send them money'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Unknown friend requests could be from fake accounts or people with malicious intent. Always verify identity before accepting.',
        timeLimit: 60,
        isActive: true
    }, 
    // B1 Level
    {
        competency: 'Online Privacy',
        level: types_1.CompetencyLevel.B1,
        questionText: 'What are cookies and how do they affect your online privacy?',
        options: {
            a: 'Edible treats sent through the internet',
            b: 'Small data files that websites store on your device to track your activity',
            c: 'A type of computer virus',
            d: 'Images on websites'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Cookies are small data files that websites store on your device to remember your preferences and track your browsing behavior.',
        timeLimit: 90,
        isActive: true
    }, {
        competency: 'Online Privacy',
        level: types_1.CompetencyLevel.B1,
        questionText: 'What is the purpose of incognito/private browsing mode?',
        options: {
            a: 'To browse faster',
            b: 'To prevent the browser from storing your browsing history and cookies locally',
            c: 'To access blocked websites',
            d: 'To improve internet connection'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Private browsing mode prevents the browser from storing history, cookies, and form data locally, but doesn\'t make you completely anonymous online.',
        timeLimit: 90,
        isActive: true
    }, 
    // B2 Level
    {
        competency: 'Online Privacy',
        level: types_1.CompetencyLevel.B2,
        questionText: 'What is data profiling and how do companies use it?',
        options: {
            a: 'Creating profiles on social media',
            b: 'Collecting and analyzing user data to create detailed profiles for targeted advertising',
            c: 'Profiling computer performance',
            d: 'Creating user account profiles'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Data profiling involves collecting and analyzing user behavior data to create detailed profiles used for targeted advertising and content delivery.',
        timeLimit: 120,
        isActive: true
    }, {
        competency: 'Online Privacy',
        level: types_1.CompetencyLevel.B2,
        questionText: 'What rights do you have under privacy regulations like GDPR?',
        options: {
            a: 'No rights regarding personal data',
            b: 'Rights to access, correct, delete, and control how your personal data is used',
            c: 'Only the right to create accounts',
            d: 'Only the right to post content'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'GDPR and similar regulations give you rights to access, correct, delete, and control the processing of your personal data by organizations.',
        timeLimit: 120,
        isActive: true
    }, 
    // C1 Level
    {
        competency: 'Online Privacy',
        level: types_1.CompetencyLevel.C1,
        questionText: 'What is fingerprinting in the context of online tracking?',
        options: {
            a: 'Using fingerprints to log into accounts',
            b: 'Collecting device and browser characteristics to create a unique identifier for tracking',
            c: 'Taking screenshots of web pages',
            d: 'Encrypting data with fingerprints'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'Browser fingerprinting collects information about your device, browser settings, and capabilities to create a unique identifier for tracking purposes.',
        timeLimit: 150,
        isActive: true
    }, {
        competency: 'Online Privacy',
        level: types_1.CompetencyLevel.C1,
        questionText: 'What is differential privacy and how does it protect user data?',
        options: {
            a: 'Privacy settings that are different for each user',
            b: 'A mathematical approach that adds noise to datasets to protect individual privacy while preserving overall data utility',
            c: 'Different types of private browsing',
            d: 'Privacy policies that differ between companies'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'Differential privacy adds mathematical noise to datasets, making it impossible to identify individual records while maintaining the dataset\'s overall utility.',
        timeLimit: 150,
        isActive: true
    }, 
    // C2 Level
    {
        competency: 'Online Privacy',
        level: types_1.CompetencyLevel.C2,
        questionText: 'How do privacy-preserving technologies like homomorphic encryption work?',
        options: {
            a: 'They encrypt data using home addresses',
            b: 'They allow computations to be performed on encrypted data without decrypting it',
            c: 'They only work on home networks',
            d: 'They encrypt data multiple times'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'Homomorphic encryption allows mathematical operations to be performed on encrypted data without decrypting it, preserving privacy during processing.',
        timeLimit: 180,
        isActive: true
    }, {
        competency: 'Online Privacy',
        level: types_1.CompetencyLevel.C2,
        questionText: 'What is the concept of privacy by design in system architecture?',
        options: {
            a: 'Designing systems that look private',
            b: 'Integrating privacy considerations into system design from the beginning rather than as an afterthought',
            c: 'Designing systems only for private companies',
            d: 'Creating designs that are kept private'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'Privacy by design integrates privacy protection measures into system architecture from the initial design phase, making privacy a core component rather than an add-on.',
        timeLimit: 180,
        isActive: true
    }, 
    // Social Media
    // A1 Level
    {
        competency: 'Social Media',
        level: types_1.CompetencyLevel.A1,
        questionText: 'What is social media?',
        options: {
            a: 'A type of television',
            b: 'Online platforms where people share content and interact with others',
            c: 'A newspaper',
            d: 'A type of email'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Social media refers to online platforms and applications that allow people to create, share content, and interact with others in virtual communities.',
        timeLimit: 60,
        isActive: true
    }, {
        competency: 'Social Media',
        level: types_1.CompetencyLevel.A1,
        questionText: 'Which of the following is an example of a social media platform?',
        options: {
            a: 'Microsoft Word',
            b: 'Facebook',
            c: 'Calculator',
            d: 'Notepad'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Facebook is one of the most popular social media platforms where users can connect, share content, and communicate with others.',
        timeLimit: 60,
        isActive: true
    }, 
    // A2 Level
    {
        competency: 'Social Media',
        level: types_1.CompetencyLevel.A2,
        questionText: 'What does it mean to "follow" someone on social media?',
        options: {
            a: 'To physically chase them',
            b: 'To subscribe to see their posts and updates in your feed',
            c: 'To copy everything they do',
            d: 'To send them messages constantly'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Following someone on social media means subscribing to their content so their posts and updates appear in your news feed.',
        timeLimit: 60,
        isActive: true
    }, {
        competency: 'Social Media',
        level: types_1.CompetencyLevel.A2,
        questionText: 'What is a hashtag and how is it used?',
        options: {
            a: 'A type of computer password',
            b: 'A symbol (#) followed by words to categorize and make content discoverable',
            c: 'A way to delete posts',
            d: 'A type of emoji'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'A hashtag is the # symbol followed by words or phrases to categorize content and make it searchable and discoverable by others.',
        timeLimit: 60,
        isActive: true
    }, 
    // B1 Level
    {
        competency: 'Social Media',
        level: types_1.CompetencyLevel.B1,
        questionText: 'What is social media etiquette and why is it important?',
        options: {
            a: 'Rules about posting frequency',
            b: 'Guidelines for respectful and appropriate behavior on social media platforms',
            c: 'Technical requirements for using social media',
            d: 'Legal requirements for social media'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Social media etiquette involves guidelines for respectful, appropriate behavior that helps maintain positive interactions and protect your reputation.',
        timeLimit: 90,
        isActive: true
    }, {
        competency: 'Social Media',
        level: types_1.CompetencyLevel.B1,
        questionText: 'What is cyberbullying and how can it be addressed on social media?',
        options: {
            a: 'A type of computer game',
            b: 'Using digital technology to harass, threaten, or embarrass others',
            c: 'A way to make friends online',
            d: 'A social media feature'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Cyberbullying involves using digital platforms to harass, threaten, or embarrass others. It can be addressed through reporting, blocking, and seeking help.',
        timeLimit: 90,
        isActive: true
    }, 
    // B2 Level
    {
        competency: 'Social Media',
        level: types_1.CompetencyLevel.B2,
        questionText: 'What is the difference between organic reach and paid reach on social media?',
        options: {
            a: 'Organic reach uses natural ingredients',
            b: 'Organic reach is free visibility, paid reach is visibility through paid advertising',
            c: 'There is no difference',
            d: 'Paid reach is always better'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Organic reach is the natural, free visibility your content receives, while paid reach is visibility gained through paid advertising and promotion.',
        timeLimit: 120,
        isActive: true
    }, {
        competency: 'Social Media',
        level: types_1.CompetencyLevel.B2,
        questionText: 'What is influencer marketing and how does it work?',
        options: {
            a: 'Marketing that influences computer performance',
            b: 'Using people with large social media followings to promote products or services',
            c: 'Marketing that only works on weekdays',
            d: 'A type of traditional advertising'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Influencer marketing leverages individuals with large, engaged social media followings to promote products, services, or brands to their audience.',
        timeLimit: 120,
        isActive: true
    }, 
    // C1 Level
    {
        competency: 'Social Media',
        level: types_1.CompetencyLevel.C1,
        questionText: 'What is social media analytics and how does it help businesses?',
        options: {
            a: 'Analyzing social behaviors offline',
            b: 'Measuring and analyzing social media performance data to optimize strategy and ROI',
            c: 'Creating social media accounts',
            d: 'Scheduling social media posts'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'Social media analytics involves collecting and analyzing performance data (engagement, reach, conversions) to optimize social media strategies and measure ROI.',
        timeLimit: 150,
        isActive: true
    }, {
        competency: 'Social Media',
        level: types_1.CompetencyLevel.C1,
        questionText: 'What is social listening and how can it benefit organizations?',
        options: {
            a: 'Listening to music on social media',
            b: 'Monitoring social media conversations to understand public sentiment and brand perception',
            c: 'Listening to social media videos',
            d: 'Following audio content only'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'Social listening involves monitoring social media conversations about your brand, competitors, or industry to understand sentiment and inform strategy.',
        timeLimit: 150,
        isActive: true
    }, 
    // C2 Level
    {
        competency: 'Social Media',
        level: types_1.CompetencyLevel.C2,
        questionText: 'How do social media algorithms determine content visibility and engagement?',
        options: {
            a: 'They show content randomly',
            b: 'They use machine learning to analyze user behavior, preferences, and engagement patterns',
            c: 'They show content chronologically only',
            d: 'They prioritize paid content exclusively'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'Social media algorithms use machine learning to analyze user behavior, preferences, engagement history, and relationships to determine what content to show.',
        timeLimit: 180,
        isActive: true
    }, {
        competency: 'Social Media',
        level: types_1.CompetencyLevel.C2,
        questionText: 'What is the role of artificial intelligence in content moderation on social media platforms?',
        options: {
            a: 'AI only creates content',
            b: 'AI automatically detects and removes inappropriate content, spam, and policy violations',
            c: 'AI only translates content',
            d: 'AI only schedules posts'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'AI systems automatically scan and identify inappropriate content, spam, hate speech, and policy violations, often removing or flagging content for human review.',
        timeLimit: 180,
        isActive: true
    }, 
    // Cloud Storage
    // A1 Level
    {
        competency: 'Cloud Storage',
        level: types_1.CompetencyLevel.A1,
        questionText: 'What is cloud storage?',
        options: {
            a: 'Storage in the sky',
            b: 'Online storage that lets you save files on remote servers accessible via internet',
            c: 'Storage that only works when it\'s cloudy',
            d: 'A type of physical hard drive'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Cloud storage allows you to save files on remote servers accessed through the internet, rather than storing them locally on your device.',
        timeLimit: 60,
        isActive: true
    }, {
        competency: 'Cloud Storage',
        level: types_1.CompetencyLevel.A1,
        questionText: 'What is a benefit of using cloud storage?',
        options: {
            a: 'Files can only be accessed from one device',
            b: 'Files can be accessed from any device with internet connection',
            c: 'Files are automatically deleted',
            d: 'Files become smaller in size'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Cloud storage allows you to access your files from any device with an internet connection, providing flexibility and convenience.',
        timeLimit: 60,
        isActive: true
    }, 
    // A2 Level
    {
        competency: 'Cloud Storage',
        level: types_1.CompetencyLevel.A2,
        questionText: 'Which of the following is a popular cloud storage service?',
        options: {
            a: 'Microsoft Word',
            b: 'Google Drive',
            c: 'Calculator',
            d: 'Notepad'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Google Drive is one of the popular cloud storage services, along with Dropbox, OneDrive, and iCloud.',
        timeLimit: 60,
        isActive: true
    }, {
        competency: 'Cloud Storage',
        level: types_1.CompetencyLevel.A2,
        questionText: 'What does "syncing" mean in cloud storage?',
        options: {
            a: 'Deleting files',
            b: 'Automatically updating files across all connected devices to keep them identical',
            c: 'Changing file names',
            d: 'Moving files to trash'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Syncing ensures that files are automatically updated and kept identical across all devices connected to the cloud storage account.',
        timeLimit: 60,
        isActive: true
    }, 
    // B1 Level
    {
        competency: 'Cloud Storage',
        level: types_1.CompetencyLevel.B1,
        questionText: 'What is file sharing in cloud storage and how does it work?',
        options: {
            a: 'Giving physical copies of files to others',
            b: 'Providing others access to your files through shareable links or permissions',
            c: 'Sharing files only with family members',
            d: 'Copying files to USB drives'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Cloud storage file sharing allows you to give others access to your files through shareable links, invitations, or by setting specific permissions.',
        timeLimit: 90,
        isActive: true
    }, {
        competency: 'Cloud Storage',
        level: types_1.CompetencyLevel.B1,
        questionText: 'What are the advantages of cloud storage over local storage?',
        options: {
            a: 'Local storage is always better',
            b: 'Cloud storage offers accessibility, backup protection, and collaboration features',
            c: 'Cloud storage is always free',
            d: 'Local storage is more secure'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Cloud storage provides accessibility from anywhere, automatic backup, version control, and collaboration features that local storage doesn\'t offer.',
        timeLimit: 90,
        isActive: true
    }, 
    // B2 Level
    {
        competency: 'Cloud Storage',
        level: types_1.CompetencyLevel.B2,
        questionText: 'What are version control features in cloud storage?',
        options: {
            a: 'Features that control software versions',
            b: 'Ability to track and restore previous versions of files',
            c: 'Features that version your account',
            d: 'Controls for cloud service versions'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Version control in cloud storage tracks changes to files and allows you to view, compare, and restore previous versions when needed.',
        timeLimit: 120,
        isActive: true
    }, {
        competency: 'Cloud Storage',
        level: types_1.CompetencyLevel.B2,
        questionText: 'What security considerations should you keep in mind when using cloud storage?',
        options: {
            a: 'Cloud storage is always 100% secure',
            b: 'Consider encryption, strong passwords, two-factor authentication, and data privacy policies',
            c: 'Security is not important for cloud storage',
            d: 'Only file size matters'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Cloud storage security involves using strong passwords, enabling two-factor authentication, understanding encryption, and reviewing privacy policies.',
        timeLimit: 120,
        isActive: true
    }, 
    // C1 Level
    {
        competency: 'Cloud Storage',
        level: types_1.CompetencyLevel.C1,
        questionText: 'What is the difference between public, private, and hybrid cloud storage models?',
        options: {
            a: 'They are all the same',
            b: 'Public is shared infrastructure, private is dedicated, hybrid combines both approaches',
            c: 'Public is free, private costs money',
            d: 'Private is slower than public'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'Public cloud uses shared infrastructure, private cloud provides dedicated resources, and hybrid cloud combines both for optimized performance and cost.',
        timeLimit: 150,
        isActive: true
    }, {
        competency: 'Cloud Storage',
        level: types_1.CompetencyLevel.C1,
        questionText: 'What is data redundancy and why is it important in cloud storage?',
        options: {
            a: 'Having too much data',
            b: 'Storing multiple copies of data across different locations to prevent data loss',
            c: 'Unnecessary data that should be deleted',
            d: 'Data that is duplicated by mistake'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'Data redundancy involves storing multiple copies of data across different geographical locations and systems to ensure data availability and prevent loss.',
        timeLimit: 150,
        isActive: true
    }, 
    // C2 Level
    {
        competency: 'Cloud Storage',
        level: types_1.CompetencyLevel.C2,
        questionText: 'How do Content Delivery Networks (CDNs) enhance cloud storage performance?',
        options: {
            a: 'They increase storage capacity',
            b: 'They distribute content across global servers to reduce latency and improve access speed',
            c: 'They only work with images',
            d: 'They compress all files automatically'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'CDNs cache and distribute content across geographically distributed servers, reducing latency and improving download speeds for users worldwide.',
        timeLimit: 180,
        isActive: true
    }, {
        competency: 'Cloud Storage',
        level: types_1.CompetencyLevel.C2,
        questionText: 'What is object storage and how does it differ from traditional file systems?',
        options: {
            a: 'Storage for physical objects only',
            b: 'A storage architecture that manages data as objects with metadata, offering scalability and API access',
            c: 'Storage that only works with object-oriented programming',
            d: 'A type of database storage'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'Object storage manages data as objects with unique identifiers and metadata, providing scalability, API access, and global distribution unlike hierarchical file systems.',
        timeLimit: 180,
        isActive: true
    });
    // Add remaining competencies with the same pattern...
    // I'll continue with a few more key competencies to demonstrate the complete structure
    // Digital Communication
    questions.push(
    // A1 Level
    {
        competency: 'Digital Communication',
        level: types_1.CompetencyLevel.A1,
        questionText: 'What is digital communication?',
        options: {
            a: 'Communication using only numbers',
            b: 'Communication through electronic devices and digital platforms',
            c: 'Communication that is always private',
            d: 'Communication that only works during the day'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Digital communication involves exchanging information through electronic devices and digital platforms like email, messaging apps, and social media.',
        timeLimit: 60,
        isActive: true
    }, {
        competency: 'Digital Communication',
        level: types_1.CompetencyLevel.A1,
        questionText: 'Which of the following is a form of digital communication?',
        options: {
            a: 'Writing a letter by hand',
            b: 'Sending a text message',
            c: 'Talking face-to-face',
            d: 'Using smoke signals'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Text messaging is a form of digital communication as it uses electronic devices to transmit messages.',
        timeLimit: 60,
        isActive: true
    }, 
    // A2 Level
    {
        competency: 'Digital Communication',
        level: types_1.CompetencyLevel.A2,
        questionText: 'What is the difference between synchronous and asynchronous digital communication?',
        options: {
            a: 'Synchronous is faster than asynchronous',
            b: 'Synchronous happens in real-time, asynchronous has delays between messages',
            c: 'Asynchronous is more secure',
            d: 'There is no difference'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Synchronous communication happens in real-time (like video calls), while asynchronous allows delays between sending and receiving messages (like email).',
        timeLimit: 60,
        isActive: true
    }, {
        competency: 'Digital Communication',
        level: types_1.CompetencyLevel.A2,
        questionText: 'What is video conferencing?',
        options: {
            a: 'Watching videos alone',
            b: 'Real-time video and audio communication between people in different locations',
            c: 'Recording videos for later viewing',
            d: 'A type of video game'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Video conferencing allows real-time audio and video communication between people in different geographical locations through internet connection.',
        timeLimit: 60,
        isActive: true
    });
    // Programming Basics
    questions.push(
    // A1 Level
    {
        competency: 'Programming Basics',
        level: types_1.CompetencyLevel.A1,
        questionText: 'What is programming?',
        options: {
            a: 'Watching TV programs',
            b: 'Writing instructions for computers to follow',
            c: 'Planning events',
            d: 'Drawing pictures'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Programming is the process of writing step-by-step instructions (code) that tell computers how to perform specific tasks.',
        timeLimit: 60,
        isActive: true
    }, {
        competency: 'Programming Basics',
        level: types_1.CompetencyLevel.A1,
        questionText: 'What is a programming language?',
        options: {
            a: 'A foreign language',
            b: 'A set of rules and syntax for writing computer programs',
            c: 'A way to speak to people',
            d: 'A type of communication device'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'A programming language is a formal set of rules, syntax, and commands used to write instructions that computers can understand and execute.',
        timeLimit: 60,
        isActive: true
    });
    // Add a comprehensive set for E-commerce as well
    questions.push(
    // A1 Level
    {
        competency: 'E-commerce',
        level: types_1.CompetencyLevel.A1,
        questionText: 'What is e-commerce?',
        options: {
            a: 'Electronic music',
            b: 'Buying and selling goods or services over the internet',
            c: 'Email communication',
            d: 'Electronic games'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'E-commerce (electronic commerce) refers to buying and selling goods or services over the internet through online platforms.',
        timeLimit: 60,
        isActive: true
    }, {
        competency: 'E-commerce',
        level: types_1.CompetencyLevel.A1,
        questionText: 'Which of the following is an example of an e-commerce website?',
        options: {
            a: 'Google Search',
            b: 'Amazon',
            c: 'Wikipedia',
            d: 'Weather.com'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Amazon is one of the world\'s largest e-commerce platforms where users can buy and sell products online.',
        timeLimit: 60,
        isActive: true
    });
    // Online Collaboration
    questions.push(
    // A1 Level
    {
        competency: 'Online Collaboration',
        level: types_1.CompetencyLevel.A1,
        questionText: 'What is online collaboration?',
        options: {
            a: 'Working alone on a computer',
            b: 'Working together with others using digital tools and platforms',
            c: 'Only meeting in person',
            d: 'Using only email for communication'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Online collaboration involves working together with others using digital tools, platforms, and technologies to achieve common goals.',
        timeLimit: 60,
        isActive: true
    }, {
        competency: 'Online Collaboration',
        level: types_1.CompetencyLevel.A1,
        questionText: 'Which of the following is an example of an online collaboration tool?',
        options: {
            a: 'Notepad',
            b: 'Google Docs',
            c: 'Calculator',
            d: 'Paint'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Google Docs is a collaborative online document editor that allows multiple people to work on the same document simultaneously.',
        timeLimit: 60,
        isActive: true
    }, 
    // A2 Level
    {
        competency: 'Online Collaboration',
        level: types_1.CompetencyLevel.A2,
        questionText: 'What does "real-time collaboration" mean?',
        options: {
            a: 'Working very quickly',
            b: 'Multiple people working on the same document or project simultaneously',
            c: 'Working during real time only',
            d: 'Using expensive software'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Real-time collaboration allows multiple users to work on the same document or project simultaneously, seeing changes as they happen.',
        timeLimit: 60,
        isActive: true
    }, {
        competency: 'Online Collaboration',
        level: types_1.CompetencyLevel.A2,
        questionText: 'What is screen sharing used for?',
        options: {
            a: 'Sharing physical screens',
            b: 'Showing your computer screen to others during online meetings',
            c: 'Splitting your screen in half',
            d: 'Changing screen colors'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Screen sharing allows you to display your computer screen to other participants during online meetings or collaboration sessions.',
        timeLimit: 60,
        isActive: true
    });
    // Data Management
    questions.push(
    // A1 Level
    {
        competency: 'Data Management',
        level: types_1.CompetencyLevel.A1,
        questionText: 'What is data?',
        options: {
            a: 'Only numbers',
            b: 'Information that can be stored and processed by computers',
            c: 'Only text',
            d: 'Only images'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Data is any information that can be stored, processed, and transmitted by computers, including text, numbers, images, audio, and video.',
        timeLimit: 60,
        isActive: true
    }, {
        competency: 'Data Management',
        level: types_1.CompetencyLevel.A1,
        questionText: 'Why is it important to organize your files and data?',
        options: {
            a: 'It makes the computer run faster',
            b: 'It helps you find information quickly and efficiently',
            c: 'It reduces electricity usage',
            d: 'It prevents computer viruses'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Organizing files and data makes it easier and faster to locate specific information when you need it.',
        timeLimit: 60,
        isActive: true
    }, 
    // B2 Level
    {
        competency: 'Data Management',
        level: types_1.CompetencyLevel.B2,
        questionText: 'What is a database used for?',
        options: {
            a: 'Playing games',
            b: 'Storing, organizing, and retrieving large amounts of structured information',
            c: 'Creating presentations',
            d: 'Browsing the internet'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'A database is a structured collection of data that allows for efficient storage, organization, retrieval, and management of information.',
        timeLimit: 120,
        isActive: true
    }, {
        competency: 'Data Management',
        level: types_1.CompetencyLevel.B2,
        questionText: 'What is data backup and why is it important?',
        options: {
            a: 'A way to speed up computers',
            b: 'Creating copies of data to protect against loss due to hardware failure or accidents',
            c: 'A type of software update',
            d: 'A method to organize files'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Data backup involves creating copies of important data to protect against loss due to hardware failures, accidents, or cyber attacks.',
        timeLimit: 120,
        isActive: true
    });
    // Digital Problem Solving
    questions.push(
    // A1 Level
    {
        competency: 'Digital Problem Solving',
        level: types_1.CompetencyLevel.A1,
        questionText: 'What should you do first when your computer freezes?',
        options: {
            a: 'Throw the computer away',
            b: 'Try restarting the computer',
            c: 'Buy a new computer',
            d: 'Ignore the problem'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'When a computer freezes, the first step is usually to restart it, which often resolves temporary software issues.',
        timeLimit: 60,
        isActive: true
    }, {
        competency: 'Digital Problem Solving',
        level: types_1.CompetencyLevel.A1,
        questionText: 'What does "troubleshooting" mean in technology?',
        options: {
            a: 'Causing more problems',
            b: 'Identifying and solving problems systematically',
            c: 'Avoiding technology',
            d: 'Making technology more complex'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Troubleshooting is the systematic process of identifying, analyzing, and solving problems or issues with technology.',
        timeLimit: 60,
        isActive: true
    });
    // Digital Ethics
    questions.push(
    // A1 Level
    {
        competency: 'Digital Ethics',
        level: types_1.CompetencyLevel.A1,
        questionText: 'What does digital ethics involve?',
        options: {
            a: 'Only using expensive technology',
            b: 'Using technology responsibly and considering its impact on others',
            c: 'Avoiding all technology',
            d: 'Using technology only for work'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Digital ethics involves the responsible use of technology while considering its impact on individuals, society, and the environment.',
        timeLimit: 60,
        isActive: true
    }, {
        competency: 'Digital Ethics',
        level: types_1.CompetencyLevel.A1,
        questionText: 'Is it ethical to use someone else\'s work without permission?',
        options: {
            a: 'Yes, always',
            b: 'No, it violates copyright and intellectual property rights',
            c: 'Only on weekends',
            d: 'Only if it\'s free'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Using someone else\'s work without permission violates copyright laws and intellectual property rights, which is unethical and often illegal.',
        timeLimit: 60,
        isActive: true
    });
    // Online Learning
    questions.push(
    // A1 Level
    {
        competency: 'Online Learning',
        level: types_1.CompetencyLevel.A1,
        questionText: 'What is online learning?',
        options: {
            a: 'Learning only about the internet',
            b: 'Educational activities conducted over the internet using digital platforms',
            c: 'Learning that requires expensive equipment',
            d: 'Learning that only happens at night'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Online learning involves educational activities, courses, and resources delivered through internet-based platforms and digital technologies.',
        timeLimit: 60,
        isActive: true
    }, {
        competency: 'Online Learning',
        level: types_1.CompetencyLevel.A1,
        questionText: 'What is an advantage of online learning?',
        options: {
            a: 'It\'s always more expensive',
            b: 'You can learn at your own pace and from anywhere with internet access',
            c: 'It requires special licenses',
            d: 'It only works on specific days'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Online learning offers flexibility, allowing students to learn at their own pace and from any location with internet access.',
        timeLimit: 60,
        isActive: true
    });
    // Digital Project Management
    questions.push(
    // A1 Level
    {
        competency: 'Digital Project Management',
        level: types_1.CompetencyLevel.A1,
        questionText: 'What is project management?',
        options: {
            a: 'Managing only computer projects',
            b: 'Planning, organizing, and controlling resources to achieve specific goals',
            c: 'Only managing large projects',
            d: 'Managing projects without any tools'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Project management involves planning, organizing, and controlling resources and activities to achieve specific objectives within defined constraints.',
        timeLimit: 60,
        isActive: true
    }, {
        competency: 'Digital Project Management',
        level: types_1.CompetencyLevel.A1,
        questionText: 'What is a digital project management tool?',
        options: {
            a: 'A physical notebook',
            b: 'Software that helps plan, track, and manage projects digitally',
            c: 'A type of computer hardware',
            d: 'A mathematical formula'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Digital project management tools are software applications that help teams plan, organize, track, and manage projects using digital platforms.',
        timeLimit: 60,
        isActive: true
    });
    // Advanced Digital Tools
    questions.push(
    // A1 Level
    {
        competency: 'Advanced Digital Tools',
        level: types_1.CompetencyLevel.A1,
        questionText: 'What makes a digital tool "advanced"?',
        options: {
            a: 'It\'s more expensive',
            b: 'It offers sophisticated features and capabilities for complex tasks',
            c: 'It\'s harder to use',
            d: 'It\'s only available to professionals'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Advanced digital tools typically offer sophisticated features, automation capabilities, and complex functionality for specialized or professional tasks.',
        timeLimit: 60,
        isActive: true
    }, {
        competency: 'Advanced Digital Tools',
        level: types_1.CompetencyLevel.A1,
        questionText: 'What is automation in digital tools?',
        options: {
            a: 'Making tools work manually',
            b: 'Using technology to perform tasks automatically without human intervention',
            c: 'Making tools more complex',
            d: 'Using tools only for cars'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Automation involves using technology to perform tasks automatically, reducing the need for manual human intervention and increasing efficiency.',
        timeLimit: 60,
        isActive: true
    }, 
    // C1 Level
    {
        competency: 'Advanced Digital Tools',
        level: types_1.CompetencyLevel.C1,
        questionText: 'What is the purpose of API (Application Programming Interface) integration in digital tools?',
        options: {
            a: 'To make applications look better',
            b: 'To allow different software applications to communicate and share data',
            c: 'To increase application size',
            d: 'To make applications run slower'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'APIs enable different software applications to communicate, share data, and integrate functionality, creating more powerful combined solutions.',
        timeLimit: 150,
        isActive: true
    }, 
    // C2 Level
    {
        competency: 'Advanced Digital Tools',
        level: types_1.CompetencyLevel.C2,
        questionText: 'How do machine learning algorithms enhance advanced digital tools?',
        options: {
            a: 'They make tools more colorful',
            b: 'They enable tools to learn from data and improve performance automatically',
            c: 'They only work with numbers',
            d: 'They make tools run faster only'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'Machine learning algorithms allow digital tools to analyze data, identify patterns, and improve their performance and accuracy over time without explicit programming.',
        timeLimit: 180,
        isActive: true
    });
    // Let me add more questions for the remaining levels and competencies to ensure comprehensive coverage
    // Additional Programming Basics questions for all levels
    questions.push(
    // A2 Level
    {
        competency: 'Programming Basics',
        level: types_1.CompetencyLevel.A2,
        questionText: 'What is an algorithm in programming?',
        options: {
            a: 'A type of computer',
            b: 'A step-by-step set of instructions to solve a problem',
            c: 'A programming language',
            d: 'A type of software'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'An algorithm is a step-by-step set of instructions or rules designed to solve a specific problem or perform a task.',
        timeLimit: 60,
        isActive: true
    }, {
        competency: 'Programming Basics',
        level: types_1.CompetencyLevel.A2,
        questionText: 'What is debugging in programming?',
        options: {
            a: 'Creating bugs in programs',
            b: 'Finding and fixing errors in computer programs',
            c: 'Removing insects from computers',
            d: 'Making programs run slower'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Debugging is the process of finding and fixing errors, bugs, or issues in computer programs to make them work correctly.',
        timeLimit: 60,
        isActive: true
    }, 
    // B1 Level
    {
        competency: 'Programming Basics',
        level: types_1.CompetencyLevel.B1,
        questionText: 'What is a variable in programming?',
        options: {
            a: 'Something that never changes',
            b: 'A storage location with a name that can hold data that may change during program execution',
            c: 'A type of computer hardware',
            d: 'A programming error'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'A variable is a named storage location in a program that can hold data values which may change during program execution.',
        timeLimit: 90,
        isActive: true
    }, {
        competency: 'Programming Basics',
        level: types_1.CompetencyLevel.B1,
        questionText: 'What is a loop in programming?',
        options: {
            a: 'A programming mistake',
            b: 'A programming construct that repeats a block of code multiple times',
            c: 'A type of cable',
            d: 'A way to end a program'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'A loop is a programming construct that allows a set of instructions to be repeated multiple times based on certain conditions.',
        timeLimit: 90,
        isActive: true
    }, 
    // B2 Level
    {
        competency: 'Programming Basics',
        level: types_1.CompetencyLevel.B2,
        questionText: 'What is a function in programming?',
        options: {
            a: 'A broken program',
            b: 'A reusable block of code that performs a specific task',
            c: 'A type of variable',
            d: 'A programming language'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'A function is a reusable block of code designed to perform a specific task, which can be called multiple times throughout a program.',
        timeLimit: 120,
        isActive: true
    }, {
        competency: 'Programming Basics',
        level: types_1.CompetencyLevel.B2,
        questionText: 'What does "syntax" mean in programming?',
        options: {
            a: 'The meaning of the program',
            b: 'The set of rules that define valid constructs in a programming language',
            c: 'The speed of the program',
            d: 'The size of the program'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Syntax refers to the set of rules and structure that define how code must be written in a specific programming language.',
        timeLimit: 120,
        isActive: true
    }, 
    // C1 Level
    {
        competency: 'Programming Basics',
        level: types_1.CompetencyLevel.C1,
        questionText: 'What is object-oriented programming (OOP)?',
        options: {
            a: 'Programming with physical objects',
            b: 'A programming paradigm based on objects that contain data and methods',
            c: 'Programming only with images',
            d: 'A type of programming language'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'Object-oriented programming is a programming paradigm that organizes code into objects containing both data (attributes) and methods (functions) that operate on that data.',
        timeLimit: 150,
        isActive: true
    }, {
        competency: 'Programming Basics',
        level: types_1.CompetencyLevel.C1,
        questionText: 'What is recursion in programming?',
        options: {
            a: 'A type of loop',
            b: 'A programming technique where a function calls itself',
            c: 'A way to delete code',
            d: 'A programming error'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'Recursion is a programming technique where a function calls itself to solve smaller instances of the same problem.',
        timeLimit: 150,
        isActive: true
    }, 
    // C2 Level
    {
        competency: 'Programming Basics',
        level: types_1.CompetencyLevel.C2,
        questionText: 'What is the difference between compiled and interpreted programming languages?',
        options: {
            a: 'There is no difference',
            b: 'Compiled languages are translated to machine code before execution, interpreted languages are executed line by line',
            c: 'Interpreted languages are faster than compiled languages',
            d: 'Compiled languages can only be used on certain days'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'Compiled languages are translated entirely into machine code before execution, while interpreted languages are executed line by line by an interpreter at runtime.',
        timeLimit: 180,
        isActive: true
    }, {
        competency: 'Programming Basics',
        level: types_1.CompetencyLevel.C2,
        questionText: 'What is the purpose of version control systems in programming?',
        options: {
            a: 'To control the version of the operating system',
            b: 'To track changes in code and enable collaboration among developers',
            c: 'To control program execution speed',
            d: 'To manage computer hardware versions'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'Version control systems track changes to source code over time, enabling multiple developers to collaborate and maintain a history of code modifications.',
        timeLimit: 180,
        isActive: true
    });
    // Let me add more comprehensive questions for Digital Communication, E-commerce, and other competencies
    // Additional Digital Communication questions
    questions.push(
    // B1 Level
    {
        competency: 'Digital Communication',
        level: types_1.CompetencyLevel.B1,
        questionText: 'What is the difference between formal and informal digital communication?',
        options: {
            a: 'Formal is longer than informal',
            b: 'Formal follows professional standards and etiquette, informal is more casual and personal',
            c: 'Informal costs more money',
            d: 'There is no difference'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Formal digital communication follows professional standards with proper grammar and etiquette, while informal communication is more casual and conversational.',
        timeLimit: 90,
        isActive: true
    }, {
        competency: 'Digital Communication',
        level: types_1.CompetencyLevel.B1,
        questionText: 'What is netiquette?',
        options: {
            a: 'A type of internet connection',
            b: 'Guidelines for appropriate behavior and communication on the internet',
            c: 'A social media platform',
            d: 'A type of computer network'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Netiquette refers to the accepted guidelines and rules for appropriate, respectful behavior and communication when using the internet.',
        timeLimit: 90,
        isActive: true
    }, 
    // B2 Level
    {
        competency: 'Digital Communication',
        level: types_1.CompetencyLevel.B2,
        questionText: 'What are the advantages and disadvantages of asynchronous communication?',
        options: {
            a: 'Only advantages, no disadvantages',
            b: 'Advantages: flexibility and time to think; Disadvantages: delayed responses and potential misunderstandings',
            c: 'Only disadvantages, no advantages',
            d: 'No significant differences'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Asynchronous communication offers flexibility and time to compose thoughtful responses, but can result in delayed responses and potential misunderstandings.',
        timeLimit: 120,
        isActive: true
    }, {
        competency: 'Digital Communication',
        level: types_1.CompetencyLevel.B2,
        questionText: 'What is digital body language?',
        options: {
            a: 'Physical movements while using computers',
            b: 'Non-verbal cues in digital communication like response time, emoji use, and message formatting',
            c: 'Dancing while typing',
            d: 'Physical exercise for computer users'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Digital body language refers to non-verbal cues in digital communication, including response times, emoji usage, message length, and formatting choices.',
        timeLimit: 120,
        isActive: true
    }, 
    // C1 Level
    {
        competency: 'Digital Communication',
        level: types_1.CompetencyLevel.C1,
        questionText: 'How does cultural context affect digital communication?',
        options: {
            a: 'It has no effect',
            b: 'Different cultures have varying communication styles, interpretations, and technological preferences',
            c: 'It only affects the language used',
            d: 'It only matters for business communication'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'Cultural context significantly affects digital communication through different communication styles, interpretations of messages, and varying comfort levels with different technologies.',
        timeLimit: 150,
        isActive: true
    }, {
        competency: 'Digital Communication',
        level: types_1.CompetencyLevel.C1,
        questionText: 'What is the impact of artificial intelligence on digital communication?',
        options: {
            a: 'AI has no impact on communication',
            b: 'AI enables automated responses, language translation, and personalized communication experiences',
            c: 'AI only makes communication slower',
            d: 'AI only works with text messages'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'AI significantly impacts digital communication through automated responses, real-time translation, sentiment analysis, and personalized communication experiences.',
        timeLimit: 150,
        isActive: true
    }, 
    // C2 Level
    {
        competency: 'Digital Communication',
        level: types_1.CompetencyLevel.C2,
        questionText: 'How do emerging technologies like AR/VR change digital communication paradigms?',
        options: {
            a: 'They don\'t change communication at all',
            b: 'They enable immersive, spatial communication experiences that blur the line between digital and physical interaction',
            c: 'They only work for gaming',
            d: 'They make communication more expensive only'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'AR/VR technologies create immersive communication experiences with spatial presence, gesture recognition, and shared virtual environments that transform how people interact digitally.',
        timeLimit: 180,
        isActive: true
    }, {
        competency: 'Digital Communication',
        level: types_1.CompetencyLevel.C2,
        questionText: 'What is the role of blockchain technology in secure digital communication?',
        options: {
            a: 'Blockchain has no role in communication',
            b: 'Blockchain can provide decentralized, tamper-proof communication systems with verified identities',
            c: 'Blockchain only works with cryptocurrency',
            d: 'Blockchain makes communication slower only'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'Blockchain technology can enable decentralized communication systems with cryptographic verification, ensuring message integrity and authenticated identities.',
        timeLimit: 180,
        isActive: true
    });
    // Additional E-commerce questions for all levels
    questions.push(
    // A2 Level
    {
        competency: 'E-commerce',
        level: types_1.CompetencyLevel.A2,
        questionText: 'What is an online shopping cart?',
        options: {
            a: 'A physical cart for groceries',
            b: 'A digital feature that stores items you want to purchase before checkout',
            c: 'A type of payment method',
            d: 'A delivery truck'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'An online shopping cart is a digital feature that temporarily stores selected items before the customer proceeds to checkout and payment.',
        timeLimit: 60,
        isActive: true
    }, {
        competency: 'E-commerce',
        level: types_1.CompetencyLevel.A2,
        questionText: 'What does "checkout" mean in e-commerce?',
        options: {
            a: 'Leaving a hotel',
            b: 'The process of completing a purchase by providing payment and delivery information',
            c: 'Looking at products',
            d: 'Returning items'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.EASY,
        explanation: 'Checkout is the final step in online shopping where customers provide payment information and confirm their purchase.',
        timeLimit: 60,
        isActive: true
    }, 
    // B1 Level
    {
        competency: 'E-commerce',
        level: types_1.CompetencyLevel.B1,
        questionText: 'What should you look for when shopping online to ensure security?',
        options: {
            a: 'The cheapest prices only',
            b: 'HTTPS encryption, secure payment options, and reputable sellers',
            c: 'The most colorful websites',
            d: 'Only websites with music'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Safe online shopping requires checking for HTTPS encryption, secure payment methods, seller reputation, and customer reviews.',
        timeLimit: 90,
        isActive: true
    }, {
        competency: 'E-commerce',
        level: types_1.CompetencyLevel.B1,
        questionText: 'What is the difference between B2B and B2C e-commerce?',
        options: {
            a: 'B2B is faster than B2C',
            b: 'B2B is business-to-business, B2C is business-to-consumer',
            c: 'B2C is more expensive than B2B',
            d: 'There is no difference'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'B2B (business-to-business) e-commerce involves transactions between businesses, while B2C (business-to-consumer) involves businesses selling to individual consumers.',
        timeLimit: 90,
        isActive: true
    }, 
    // B2 Level
    {
        competency: 'E-commerce',
        level: types_1.CompetencyLevel.B2,
        questionText: 'What is digital marketing in the context of e-commerce?',
        options: {
            a: 'Only creating websites',
            b: 'Promoting products and services through digital channels to attract and convert customers',
            c: 'Only social media posting',
            d: 'Only email sending'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'Digital marketing encompasses various online strategies including SEO, social media, email marketing, and advertising to promote e-commerce businesses.',
        timeLimit: 120,
        isActive: true
    }, {
        competency: 'E-commerce',
        level: types_1.CompetencyLevel.B2,
        questionText: 'What is customer relationship management (CRM) in e-commerce?',
        options: {
            a: 'Managing customer complaints only',
            b: 'Systems and strategies for managing customer interactions and improving relationships',
            c: 'Only managing customer emails',
            d: 'Managing customer passwords'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.MEDIUM,
        explanation: 'CRM involves using technology and strategies to manage customer interactions, track preferences, and build long-term relationships to improve customer satisfaction.',
        timeLimit: 120,
        isActive: true
    }, 
    // C1 Level
    {
        competency: 'E-commerce',
        level: types_1.CompetencyLevel.C1,
        questionText: 'What is omnichannel retail strategy?',
        options: {
            a: 'Selling only online',
            b: 'Integrating multiple sales channels to provide seamless customer experience across all touchpoints',
            c: 'Using only physical stores',
            d: 'Selling through one channel only'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'Omnichannel strategy integrates online, mobile, and physical store experiences to provide customers with consistent, seamless interactions across all channels.',
        timeLimit: 150,
        isActive: true
    }, {
        competency: 'E-commerce',
        level: types_1.CompetencyLevel.C1,
        questionText: 'How does artificial intelligence enhance e-commerce operations?',
        options: {
            a: 'AI has no role in e-commerce',
            b: 'AI enables personalized recommendations, chatbots, inventory management, and fraud detection',
            c: 'AI only makes websites look better',
            d: 'AI only works for large companies'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'AI enhances e-commerce through personalized product recommendations, intelligent chatbots, predictive analytics, automated inventory management, and fraud detection systems.',
        timeLimit: 150,
        isActive: true
    }, 
    // C2 Level
    {
        competency: 'E-commerce',
        level: types_1.CompetencyLevel.C2,
        questionText: 'What is the impact of blockchain technology on e-commerce?',
        options: {
            a: 'Blockchain has no impact on e-commerce',
            b: 'Blockchain can enable secure transactions, supply chain transparency, and decentralized marketplaces',
            c: 'Blockchain only works with physical stores',
            d: 'Blockchain makes e-commerce more expensive only'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'Blockchain technology can revolutionize e-commerce through secure, transparent transactions, supply chain tracking, smart contracts, and decentralized marketplace platforms.',
        timeLimit: 180,
        isActive: true
    }, {
        competency: 'E-commerce',
        level: types_1.CompetencyLevel.C2,
        questionText: 'How do machine learning algorithms optimize e-commerce personalization?',
        options: {
            a: 'They don\'t affect personalization',
            b: 'They analyze user behavior patterns to predict preferences and customize shopping experiences',
            c: 'They only change website colors',
            d: 'They only work during business hours'
        },
        correctAnswer: 'b',
        difficulty: types_1.QuestionDifficulty.HARD,
        explanation: 'Machine learning algorithms analyze vast amounts of user data, purchase history, and behavior patterns to create highly personalized shopping experiences and product recommendations.',
        timeLimit: 180,
        isActive: true
    });
    return questions;
};
const seedDatabase = async () => {
    try {
        const adminExists = await User_model_1.default.findOne({ role: types_1.UserRole.ADMIN });
        if (!adminExists) {
            const adminEmail = process.env.ADMIN_EMAIL || 'admin@testschool.com';
            const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';
            const admin = await User_model_1.default.create({
                firstName: 'Admin',
                lastName: 'User',
                email: adminEmail,
                password: adminPassword,
                role: types_1.UserRole.ADMIN,
                isEmailVerified: true,
                isActive: true
            });
            console.log(`Admin user created with email: ${adminEmail}`);
        }
        const questionCount = await Question_model_1.default.countDocuments();
        if (questionCount < 132) {
            const questions = generateQuestions();
            await Question_model_1.default.insertMany(questions, { ordered: false });
            console.log(`${questions.length} sample questions created`);
        }
        const supervisorExists = await User_model_1.default.findOne({ email: 'supervisor@testschool.com' });
        if (!supervisorExists) {
            await User_model_1.default.create({
                firstName: 'Supervisor',
                lastName: 'User',
                email: 'supervisor@testschool.com',
                password: 'Supervisor@123',
                role: types_1.UserRole.SUPERVISOR,
                isEmailVerified: true,
                isActive: true
            });
            console.log('Supervisor user created');
        }
        const studentExists = await User_model_1.default.findOne({ email: 'student@testschool.com' });
        if (!studentExists) {
            await User_model_1.default.create({
                firstName: 'Student',
                lastName: 'User',
                email: 'student@testschool.com',
                password: 'Student@123',
                role: types_1.UserRole.STUDENT,
                isEmailVerified: true,
                isActive: true
            });
            console.log('Sample student user created');
        }
        console.log('Database seeding completed');
    }
    catch (error) {
        console.error('Error seeding database:', error);
    }
};
exports.seedDatabase = seedDatabase;
//# sourceMappingURL=seed.utils.js.map