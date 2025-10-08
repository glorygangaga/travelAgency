import { LanguageLists } from './LanguageLists';
import { LanguageTitle } from './LanguageTitle';

export default function Page() {
  return (
    <div className='grid gap-3 min-lg:w-lg'>
      <LanguageTitle />
      <LanguageLists />
    </div>
  );
}
