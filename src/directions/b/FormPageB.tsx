// Two pages that are forms: /work-with-us (the Talent Partners strip on its own page) and
// /general-inquiry (one box, then name, phone and email — rework/rulings §10).
import type { Page } from "@/lib/content";
import { getGlobal } from "@/lib/content";
import { InlineNodes } from "@/components/Inline";
import forms from "../../../content/forms.json";
import styles from "./b.module.css";
import MotionB from "./MotionB";
import Typed from "./Typed";
import { Chapters, Panel } from "./Chapter";
import FormStrip from "./FormStrip";
import type { FormDef, Labels, Routing } from "./FormStrip";
import WriteForm from "./WriteForm";
import { Ring } from "./PageB";

export default function FormPageB({ page }: { page: Page }) {
  const g = getGlobal();
  const h1 = page.sections[0].blocks.find((b) => b.type === "h1");
  const lead = page.sections[0].blocks.find((b) => b.type === "lead");
  const labels = forms.labels as Labels;
  return (
    <Chapters openIds={page.form === "talent" ? ["form-talent"] : []}>
    <div className={styles.page}>
      <MotionB />
      <section className={`${styles.row} ${styles.intentHero} ${styles.formHero}`}>
        <div className={`${styles.panel} ${styles.stone}`}>
          <Typed text={g.shortName} delay={200} speed={90} className={`${styles.mono} ${styles.intentSmall}`} as="p" />
          {h1 && h1.type === "h1" && <Typed text={page.title.replace(/ — .*$/, "")} delay={900} speed={70} className={styles.intentName} as="h1" />}
        </div>
        <div className={`${styles.panel} ${page.form === "talent" ? styles.tealDeep : styles.plumLight}`}>
          {lead && lead.type === "lead" && <p className={styles.lead}><InlineNodes nodes={lead.text} /></p>}
        </div>
      </section>
      {page.form === "talent" ? (
        <Panel id="form-talent" label={forms.forms.talent.title}>
          <FormStrip id="form-talent" forms={{ talent: forms.forms.talent as FormDef }} routing={{ id: "who", label: "", type: "choice", options: [], sentence: [] } as Routing} title={forms.forms.talent.title} labels={labels} consent={forms.consent} notWired={g.fields.formNotWired} closeLabel={g.fields.menuClose} startWith="talent" />
        </Panel>
      ) : (
        <WriteForm fields={forms.write.fields as { label: string; type: "text" | "tel" | "email" }[]} box={forms.write.box} email={forms.write.email} labels={labels} consent={forms.consent} notWired={g.fields.formNotWired} />
      )}
      <Ring page={page} />
    </div>
    </Chapters>
  );
}
